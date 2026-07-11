const fs = require("fs");

const DATA_FILE = "tasks.json";
const PRIORITY_ORDER = { yuksek: 0, orta: 1, dusuk: 2 };

function loadTasks() {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  const content = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(content);
}

function saveTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

function addTask(tasks, text, priority = "orta") {
  const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  tasks.push({ id: nextId, text: text, done: false, priority: priority });
}

function completeTask(tasks, id) {
  for (const task of tasks) {
    if (task.id === id) {
      task.done = true;
    }
  }
}

function deleteTask(tasks, id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
  }
}

function filterTasks(tasks, filter) {
  if (filter === "pending") {
    return tasks.filter((task) => !task.done);
  }
  if (filter === "done") {
    return tasks.filter((task) => task.done);
  }
  return tasks;
}

function sortByPriority(tasks) {
  return [...tasks].sort(
    (a, b) => (PRIORITY_ORDER[a.priority] ?? 1) - (PRIORITY_ORDER[b.priority] ?? 1)
  );
}

module.exports = {
  loadTasks,
  saveTasks,
  addTask,
  completeTask,
  deleteTask,
  filterTasks,
  sortByPriority,
};
