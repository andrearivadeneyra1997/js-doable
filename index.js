import DOMHandler from "./scripts/dom-handler.js";
import LoginPage from "./scripts/pages/login-page.js";
import CreateAccountPage from "./scripts/pages/signup-page.js";
//import NewContactPage from "./scripts/pages/new-contact-page.js";
//import EditContactPage from "./scripts/pages/edit-contact-page.js";
import AllTask from "./scripts/pages/all-task.js";
import STORE from "./scripts/store.js";
import { tokenKey } from "./scripts/config.js";

async function init() {
  try {
    const token = sessionStorage.getItem(tokenKey);
    if (!token) return DOMHandler.load(LoginPage);
    await STORE.fetchTasks();
    DOMHandler.load(AllTask);
  } catch (error) {
    console.error(error);
    sessionStorage.removeItem(tokenKey);
    DOMHandler.load(LoginPage);
  }
}
init();
