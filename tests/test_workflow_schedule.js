const assert = require('node:assert/strict');

global.window = {};

require('../app/workflows.runner.js');
const { buildCronFromSchedule, parseCronToSchedule, applyScheduleToWorkflowYaml } =
  window.DPRWorkflowRunner.__test;

const UTC8 = 480; // 北京时间 UTC+8

function testBuildCronDaily() {
  // 北京时间 02:30 每天 → UTC 18:30 前一天
  assert.equal(
    buildCronFromSchedule({ timeLocal: '02:30', dayMode: 'daily', weekdays: [], utcOffsetMinutes: UTC8 }),
    '30 18 * * *',
  );
  // UTC+0 时区 09:00 → 直接 9 点
  assert.equal(
    buildCronFromSchedule({ timeLocal: '09:00', dayMode: 'daily', weekdays: [], utcOffsetMinutes: 0 }),
    '0 9 * * *',
  );
}

function testBuildCronWorkdaysShiftsWeekdays() {
  // 北京时间工作日 02:30 = UTC 前一天 18:30：周一至周五 → UTC 周日至周四（0-4）
  assert.equal(
    buildCronFromSchedule({ timeLocal: '02:30', dayMode: 'workdays', weekdays: [], utcOffsetMinutes: UTC8 }),
    '30 18 * * 0,1,2,3,4',
  );
  // UTC+0 工作日不偏移
  assert.equal(
    buildCronFromSchedule({ timeLocal: '09:00', dayMode: 'workdays', weekdays: [], utcOffsetMinutes: 0 }),
    '0 9 * * 1,2,3,4,5',
  );
}

function testBuildCronCustomDays() {
  // 周一、周三、周五（1,3,5）北京时间 08:00 → UTC 00:00 同日（不跨日，无偏移）
  assert.equal(
    buildCronFromSchedule({ timeLocal: '08:00', dayMode: 'custom', weekdays: [1, 3, 5], utcOffsetMinutes: UTC8 }),
    '0 0 * * 1,3,5',
  );
  // 跨到前一天：UTC+13 时区的周二 02:30 = UTC 周一 13:30；本地周一(1) → UTC 周日(0)
  assert.equal(
    buildCronFromSchedule({ timeLocal: '02:30', dayMode: 'custom', weekdays: [1], utcOffsetMinutes: 780 }),
    '30 13 * * 0',
  );
}

function testBuildCronValidation() {
  assert.throws(() => buildCronFromSchedule({ timeLocal: '9', dayMode: 'daily', weekdays: [], utcOffsetMinutes: 0 }));
  assert.throws(() => buildCronFromSchedule({ timeLocal: '25:00', dayMode: 'daily', weekdays: [], utcOffsetMinutes: 0 }));
  assert.throws(() => buildCronFromSchedule({ timeLocal: '08:00', dayMode: 'custom', weekdays: [], utcOffsetMinutes: 0 }));
}

function testParseCronRoundTrip() {
  const s1 = parseCronToSchedule('30 18 * * *', UTC8);
  assert.equal(s1.timeLocal, '02:30');
  assert.equal(s1.dayMode, 'daily');

  const s2 = parseCronToSchedule('30 18 * * 0,1,2,3,4', UTC8);
  assert.equal(s2.timeLocal, '02:30');
  assert.equal(s2.dayMode, 'workdays');
  assert.deepEqual(s2.weekdays, [1, 2, 3, 4, 5]);

  const s3 = parseCronToSchedule('0 0 * * 1,3,5', UTC8);
  assert.equal(s3.timeLocal, '08:00');
  assert.equal(s3.dayMode, 'custom');
  assert.deepEqual(s3.weekdays, [1, 3, 5]);

  // 往返一致
  const cron2 = buildCronFromSchedule({ ...s3, utcOffsetMinutes: UTC8 });
  assert.equal(cron2, '0 0 * * 1,3,5');
}

function testApplyScheduleToWorkflowYaml() {
  const fs = require('node:fs');
  const path = require('node:path');
  const yamlPath = path.join(__dirname, '..', '.github', 'workflows', 'daily-paper-reader.yml');
  const original = fs.readFileSync(yamlPath, 'utf8');

  const next = applyScheduleToWorkflowYaml(original, { cron: '0 1 * * 1,2,3,4,5', jitterMinutes: 10 });
  assert.ok(next.includes('- cron: "0 1 * * 1,2,3,4,5"'), 'cron replaced');
  assert.ok(next.includes('shuf -i 0-600 -n 1'), 'jitter replaced');
  assert.ok(next.includes('DPR-SCHEDULE-CRON-ANCHOR'), 'anchor comment kept');
  // 未被替换的部分保持不变
  assert.ok(next.includes('workflow_dispatch:'));

  // 无锚点的文本必须抛错，拒绝盲改
  assert.throws(() =>
    applyScheduleToWorkflowYaml(original.replace(/DPR-SCHEDULE-CRON-ANCHOR[^\n]*\n/g, ''), {
      cron: '0 1 * * *',
    }),
  );
}

testBuildCronDaily();
testBuildCronWorkdaysShiftsWeekdays();
testBuildCronCustomDays();
testBuildCronValidation();
testParseCronRoundTrip();
testApplyScheduleToWorkflowYaml();

console.log('workflow schedule tests passed');

const { nextScheduledRun, summarizeRunSteps } = window.DPRWorkflowRunner.__test;
const native = applyScheduleToWorkflowYaml(
  require('node:fs').readFileSync(require('node:path').join(__dirname, '../.github/workflows/daily-paper-reader.yml'), 'utf8'),
  { cron: '30 2 * * 1,2,3,4,5', timezone: 'Asia/Shanghai', jitterMinutes: 0 },
);
assert.ok(native.includes('timezone: "Asia/Shanghai"'));
assert.ok(native.includes('shuf -i 0-0 -n 1'));
assert.throws(() => applyScheduleToWorkflowYaml(native, { cron:'0 9 * * *', timezone:'Bad/Zone' }));
assert.equal(nextScheduledRun({ timeLocal:'02:30', timezone:'Asia/Shanghai', dayMode:'workdays' }, new Date('2026-10-16T20:00:00Z')).toISOString(), '2026-10-18T18:30:00.000Z');
assert.equal(nextScheduledRun({ timeLocal:'09:00', timezone:'America/New_York', dayMode:'daily' }, new Date('2026-11-01T01:00:00Z')).toISOString(), '2026-11-01T14:00:00.000Z');
assert.equal(parseCronToSchedule('0 9 1 * *', 0), null);
const failed = summarizeRunSteps({status:'completed',conclusion:'failure'}, [{ steps:[{name:'Score relevance with LLM',status:'completed',conclusion:'failure',started_at:'2026-10-19T00:00:00Z',completed_at:'2026-10-19T00:01:20Z'}] }]);
assert.equal(failed.failed, true);
assert.equal(failed.label, '模型相关性评分');
assert.equal(failed.duration, '1 分 20 秒');
const committed = summarizeRunSteps({}, [{steps:[{name:'Commit results',conclusion:'success'},{name:'Verify existing Pages publication',status:'queued'}]}]);
assert.equal(committed.publication, '产物已提交，网站更新待核验');
console.log('native timezone, DST, run stages and publication tests passed');
