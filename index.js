// Görevleri tutan dizi (array). Her görev bir nesne (object): { id, text, done }
let tasks = [];
let nextId = 1;

function addTask(text) {
  tasks.push({ id: nextId, text: text, done: false });
  nextId = nextId + 1;
}

function listTasks() {
  for (const task of tasks) {
    const mark = task.done ? "[x]" : "[ ]";
    console.log(`${mark} ${task.id}. ${task.text}`);
  }
}

// TODO: Bu fonksiyonu tamamla.
// Amaç: verilen id'ye sahip görevi bulup "done" alanını true yapmak.
// İpucu: tasks dizisinde bir for döngüsü veya .find() ile ilerle,
// task.id === id ise task.done = true yap.
function completeTask(id) {
  for (const task of tasks) {
    if (task.id === id) {
      task.done = true;
    }
  }
}

// --- Deneme amaçlı çağrılar ---
addTask("Ekmek al");
addTask("Git öğren");
addTask("Claude Code ile pratik yap");

completeTask(1);

listTasks();
