const fs = require("fs");

const DATA_FILE = "tasks.json";

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

const PRIORITY_ORDER = { yuksek: 0, orta: 1, dusuk: 2 };
const PRIORITY_COLOR = { yuksek: "\x1b[31m", orta: "\x1b[33m", dusuk: "\x1b[32m" };
const RESET = "\x1b[0m";

function listTasks(tasks, filter) {
  let filtered = tasks;
  if (filter === "pending") {
    filtered = tasks.filter((task) => !task.done);
  } else if (filter === "done") {
    filtered = tasks.filter((task) => task.done);
  }
  if (filtered.length === 0) {
    console.log("Gösterilecek görev yok.");
    return;
  }
  const sorted = [...filtered].sort(
    (a, b) => (PRIORITY_ORDER[a.priority] ?? 1) - (PRIORITY_ORDER[b.priority] ?? 1)
  );
  for (const task of sorted) {
    const mark = task.done ? "[x]" : "[ ]";
    const color = PRIORITY_COLOR[task.priority] || "";
    console.log(`${mark} ${task.id}. ${color}●${RESET} ${task.text}`);
  }
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

// --- Terminalden gelen komutu oku ve çalıştır ---
// process.argv[0] = node, process.argv[1] = index.js, process.argv[2] = komut (add/list/complete)
const command = process.argv[2];
const tasks = loadTasks();

if (command === "add") {
  const args = process.argv.slice(3);
  let priority = "orta";
  const flagIndex = args.indexOf("--priority");
  if (flagIndex !== -1) {
    priority = args[flagIndex + 1];
    args.splice(flagIndex, 2);
  }
  const text = args.join(" ");
  addTask(tasks, text, priority);
  saveTasks(tasks);
  console.log(`Eklendi: ${text} (${priority})`);
} else if (command === "list") {
  const filterArg = process.argv[3];
  let filter = null;
  if (filterArg === "--pending") {
    filter = "pending";
  } else if (filterArg === "--done") {
    filter = "done";
  }
  listTasks(tasks, filter);
} else if (command === "complete") {
  const id = Number(process.argv[3]);
  completeTask(tasks, id);
  saveTasks(tasks);
  console.log(`${id} numaralı görev tamamlandı.`);
} else if (command === "delete") {
  const id = Number(process.argv[3]);
  deleteTask(tasks, id);
  saveTasks(tasks);
  console.log(`${id} numaralı görev silindi.`);
} else {
  console.log("Kullanım: node index.js add|list|complete|delete ...");
}
