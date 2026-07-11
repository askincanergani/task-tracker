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

function addTask(tasks, text) {
  const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  tasks.push({ id: nextId, text: text, done: false });
}

function listTasks(tasks) {
  if (tasks.length === 0) {
    console.log("Henüz görev yok.");
    return;
  }
  for (const task of tasks) {
    const mark = task.done ? "[x]" : "[ ]";
    console.log(`${mark} ${task.id}. ${task.text}`);
  }
}

function completeTask(tasks, id) {
  for (const task of tasks) {
    if (task.id === id) {
      task.done = true;
    }
  }
}

// --- Terminalden gelen komutu oku ve çalıştır ---
// process.argv[0] = node, process.argv[1] = index.js, process.argv[2] = komut (add/list/complete)
const command = process.argv[2];
const tasks = loadTasks();

if (command === "add") {
  const text = process.argv.slice(3).join(" ");
  addTask(tasks, text);
  saveTasks(tasks);
  console.log(`Eklendi: ${text}`);
} else if (command === "list") {
  listTasks(tasks);
} else if (command === "complete") {
  const id = Number(process.argv[3]);
  completeTask(tasks, id);
  saveTasks(tasks);
  console.log(`${id} numaralı görev tamamlandı.`);
} else {
  console.log("Kullanım: node index.js add|list|complete ...");
}
