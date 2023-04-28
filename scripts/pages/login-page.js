import STORE from "../store.js";
import Header from "../components/header.js";
import { input } from "../components/input.js";
import { login } from "../services/sessions.js";
import CreateAccountPage from "./signup-page.js";
import DOMHandler from "../dom-handler.js";
import AllTask from "./all-task.js";

function render() {
  STORE.titlePage = "Login";
  STORE.enableLogout = false;
  return `
    ${Header}
    <main class="section">
      <section>
        <form class="js-login-form">
          ${input({
    id: "email",
    placeholder: "you@example.com",
    label: "Email",
    type: "email",
    required: true,
  })}
          ${input({
    id: "password",
    label: "Password",
    placeholder: "******",
    type: "password",
    required: true,
  })}
          <div class="container-form-actions">
            <button type="submit" class="button-primary">Login</button>
            <a id="signup" class="link-primary">Create account </a>
          </div>
        </form>
      </section>
    </main>
  `;
}

function listenLogin() {
  const form = document.querySelector(".js-login-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const { email, password } = event.target;
      const credentials = {
        email: email.value,
        password: password.value,
      };
      const user = await login(credentials);
      console.log(user);
      await STORE.fetchTasks();
      DOMHandler.load(AllTask);
    } catch (error) {
      console.log(error.message);
    }
  });
}

function listenGoToSignup() {
  const loginTag = document.getElementById("signup");
  loginTag.addEventListener("click", () => {
    DOMHandler.load(CreateAccountPage);
  });
}

const LoginPage = {
  toString() {
    return render();
  },
  addListeners() {
    listenLogin();
    listenGoToSignup();
    Header.addListeners();
  },
};
export default LoginPage;
