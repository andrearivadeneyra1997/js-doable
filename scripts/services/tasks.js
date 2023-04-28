import apiFetch from "./api-fetch.js";

export function getTasks() {
  return apiFetch("tasks");
}

export function getSingleTask(id) {
  return apiFetch(`tasks/${id}`);
}

export function createTasks(newTask = { title, due_date }) {
  return apiFetch("tasks", { body: newTask });
}

export function deleteTask(id) {
  return apiFetch(`/tasks/${id}`, { method: "DELETE" });
}

export function updateTask(
  id,
  updateTask = { title, due_date, important, completed }
) {
  return apiFetch(`/tasks/${id}`, { method: "PATCH", body: updateTask });
}
