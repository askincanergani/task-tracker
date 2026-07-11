const {
  loadTasks,
  saveTasks,
  addTask,
  completeTask,
  deleteTask,
  filterTasks,
  sortByPriority,
} = require("./tasks");

const PRIORITY_COLOR = { yuksek: "\x1b[31m", orta: "\x1b[33m", dusuk: "\x1b[32m" };
const RESET = "\x1b[0m";

function printTasks(tasks) {
  if (tasks.length === 0) {
    console.log("Gösterilecek görev yok.");
    return;
  }
  for (const task of tasks) {
    const mark = task.done ? "[x]" : "[ ]";
    const color = PRIORITY_COLOR[task.priority] || "";
    console.log(`${mark} ${task.id}. ${color}●${RESET} ${task.text}`);
  }
}

// --- Terminalden gelen komutu oku ve çalıştır ---
// process.argv[0] = node, process.argv[1] = index.js, process.argv[2] = komut (add/list/complete/delete)
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
  printTasks(sortByPriority(filterTasks(tasks, filter)));
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
