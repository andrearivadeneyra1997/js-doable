import DOMHandler from "../dom-handler.js";
import LoginPage from "../pages/login-page.js";
import { logout } from "../services/sessions.js";
import STORE from "../store.js";

export function render() {
  return `
    <header>
    <img src="doable.png" class="logo" />
    ${STORE.enableLogout
      ? `<button class="js-logout">Logout</button>`
      : ""
    }
    </header>
  `;

}

function listenLogout() {
  if (STORE.enableLogout) {
    const anchorLogout = document.querySelector(".js-logout");
    anchorLogout.addEventListener("click", async () => {
      try {
        await logout();
        DOMHandler.load(LoginPage);
      } catch (error) {
        console.log(error);
      }
    });
  }
}

const Header = {
  toString() {
    return render();
  },
  addListeners() {
    listenLogout();
  },
};
export default Header;
