const test = require("node:test");
const assert = require("node:assert");
const { addTask, completeTask, deleteTask, filterTasks, sortByPriority } = require("./tasks");

test("addTask yeni gorevi varsayilan oncelikle ekler", () => {
  const tasks = [];
  addTask(tasks, "Ekmek al");
  assert.strictEqual(tasks.length, 1);
  assert.strictEqual(tasks[0].text, "Ekmek al");
  assert.strictEqual(tasks[0].priority, "orta");
  assert.strictEqual(tasks[0].done, false);
});

test("completeTask ilgili gorevi tamamlanmis isaretler", () => {
  const tasks = [{ id: 1, text: "x", done: false, priority: "orta" }];
  completeTask(tasks, 1);
  assert.strictEqual(tasks[0].done, true);
});

test("deleteTask gorevi listeden cikarir", () => {
  const tasks = [{ id: 1, text: "x", done: false, priority: "orta" }];
  deleteTask(tasks, 1);
  assert.strictEqual(tasks.length, 0);
});

test("filterTasks sadece bekleyenleri dondurur", () => {
  const tasks = [
    { id: 1, done: true },
    { id: 2, done: false },
  ];
  const result = filterTasks(tasks, "pending");
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0].id, 2);
});

test("sortByPriority yuksek onceligi basa alir", () => {
  const tasks = [
    { id: 1, priority: "dusuk" },
    { id: 2, priority: "yuksek" },
  ];
  const sorted = sortByPriority(tasks);
  assert.strictEqual(sorted[0].id, 2);
});
