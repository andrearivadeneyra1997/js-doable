import { getTasks } from "./services/tasks.js";

async function fetchTasks() {
  const lisTasks = await getTasks();
  this.tasks = lisTasks;
}

function sortTasks(value) {
  this.tasks = this.tasks.sort((a, b) => a[value].localeCompare(b[value]));
}

async function showPendingTasks(value) {
  this.onlyPending = value;
  if (value) {
    this.tasks = this.tasks.filter((a) => !a.completed);
  } else {
    await this.fetchTasks();
  }
}

async function showImportantTasks(value) {
  this.onlyImportant = value;
  if (value) {
    this.tasks = this.tasks.filter((a) => a.important);
  } else {
    await this.fetchTasks();
  }
}

const STORE = {
  onlyImportant: false,
  onlyPending: false,
  titlePage: "",
  enableLogout: true,
  tasks: [],
  fetchTasks,
  sortTasks,
  showPendingTasks,
  showImportantTasks,
};

export default STORE;
