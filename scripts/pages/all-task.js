import STORE from "../store.js";
import Header from "../components/header.js";
import { task } from "../components/task.js";
import { input } from "../components/input.js";
import { button } from "../components/button.js";
import { select } from "../components/select.js";
import { createTasks, updateTask } from "../services/tasks.js";
import DOMHandler from "../dom-handler.js";

function render() {
  return `
    ${Header}
    <div style="height: 90vh;">
      ${select({
    id: "sort",
    name: "Sort",
    options: [
      {
        title: "Alphabetical (a-z)",
        value: "title",
      },
      {
        title: "Due Date",
        value: "due_date",
      },
      {
        title: "Importance",
        value: "important",
      },
    ]
  })}

    <div style="display: flex; flex-direction: row; justify-content: space-between; padding: 0 16px; font-size: 14px;">
      <div>Show</div>
      <div style="display: flex; flex-direction: row;">
        <div style="display: flex; flex-direction: row;">
          ${input({
    id: "pending-checkbox",
    type: "checkbox",
    name: "pending",
    marginTop: "0px",
    value: STORE.onlyPending,
  })}
          <div style="margin-left: 10px;">
            Only Pending
          </div>
        </div>
    
        <div style="display: flex; flex-direction: row;">
          ${input({
    id: "important-checkbox",
    type: "checkbox",
    name: "important",
    marginTop: "0px",
    value: STORE.onlyImportant,
  })}
          <div style="margin-left: 10px;">
            Only Important
          </div>
        </div>
      </div>
    </div>

    <div style="padding: 12px 18px;">
      <div>
        ${STORE.tasks.map(t => task(t)).join("")}
      </div>
    </div>
    <form id="create-task-form" style="padding: 0 14px; position: absolute; bottom: 10px; width: -webkit-fill-available;">
      ${input({
    name: "title",
    placeholder: "do the dishes...",
    marginTop: "4px",
  })}
      ${input({
    name: "due_date",
    placeholder: "mm / dd / yy",
    type: "date",
    marginTop: "4px",
  })}
${button({
    content: "Add Task",
    marginTop: "4px",
  })
    }
    </form>
  </div>
  `
};

function changeCompleted() {
  let checkboxes = document.getElementsByClassName("completed-checkbox");

  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("click", async (event) => {
      event.preventDefault();
      try {
        const { checked, value } = event.target;
        await updateTask(value, {
          completed: checked
        });
        await STORE.fetchTasks();
        DOMHandler.load(AllTask);
      } catch (error) {
        console.log(error.message);
      }
    });
  }
}

function changeImportance() {
  let checkboxes = document.getElementsByClassName("importance-checkbox");
  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("click", async (event) => {
      event.preventDefault();
      try {
        const { value } = event.target;
        await updateTask(value, {
          important: value
        });
        await STORE.fetchTasks();
        DOMHandler.load(AllTask);
      } catch (error) {
        console.log(error.message);
      }
    });
  }
}

function addSingleTask() {
  const form = document.getElementById("create-task-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const { title, due_date } = event.target;
      const data = {
        title: title.value,
        due_date: due_date.value,
      }

      await createTasks(data);
      await STORE.fetchTasks();
      DOMHandler.load(AllTask);
    } catch (error) {
      console.log(error.message);
    }
  });
}

function sortAllTasks() {
  const sortElement = document.getElementById("sort");

  sortElement.addEventListener("change", event => {
    event.preventDefault();
    STORE.sortTasks(event.target.value);
    DOMHandler.load(AllTask);
  })
}

function showAllImportantTasks() {
  const checkbox = document.getElementById("important-checkbox");

  checkbox.addEventListener("change", async (event) => {
    event.preventDefault();
    await STORE.showImportantTasks(event.target.checked);
    DOMHandler.load(AllTask);
  })
}

function showAllPendingTasks() {
  const checkbox = document.getElementById("pending-checkbox");

  checkbox.addEventListener("click", async (event) => {
    event.preventDefault();
    await STORE.showPendingTasks(event.target.checked);
    DOMHandler.load(AllTask);
  })
}

const AllTask = {
  toString() {
    return render();
  },
  addListeners() {
    sortAllTasks();
    changeCompleted();
    changeImportance();
    showAllPendingTasks();
    showAllImportantTasks();
    addSingleTask();
    Header.addListeners();
  },
};
export default AllTask;