import STORE from "../store.js";
import Header from "../components/header.js";
import { input } from "../components/input.js";
import { createUser } from "../services/user.js";
import DOMHandler from "../dom-handler.js";
import LoginPage from "./login-page.js";

function render() {
  STORE.titlePage = "Signup";
  STORE.enableLogout = false;
  return `
    ${Header}
    <main class="section">
      <section class="container">
        <form class="js-create-account-form">
          ${input({
    id: "email",
    placeholder: "you@example.com",
    label: "Email",
    type: "email",
    required: true,
  })}
          ${input({
    id: "password",
    placeholder: "******",
    label: "Password",
    type: "password",
    required: true,
  })}
          <div class="container-form-actions">
            <button type="submit "class="button-primary">Create Account</button>
            <a id="login" class="link-primary">Login</a>
          </div>
        </form>
      </section>
    </main>
  `;
}

function listenCreateAccount() {
  const form = document.querySelector(".js-create-account-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const { email, password } = event.target;
      const credentials = {
        email: email.value,
        password: password.value,
      };
      const user = await createUser(credentials);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  });
}

function listenGoToLogin() {
  const loginTag = document.getElementById("login");
  loginTag.addEventListener("click", () => {
    DOMHandler.load(LoginPage);
  });
}

const CreateAccountPage = {
  toString() {
    return render();
  },
  addListeners() {
    listenCreateAccount();
    listenGoToLogin();
    Header.addListeners();
  },
};
export default CreateAccountPage;
