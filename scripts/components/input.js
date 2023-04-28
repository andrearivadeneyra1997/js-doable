export function input({
  label,
  id,
  name,
  placeholder = "",
  type,
  required = false,
  value,
  marginTop = "30px",
}) {
  return `
  <div class="input" style="margin-top: ${marginTop}">
    ${label
      ? `<label for="${id}">${label}</label>`
      : ""
    }
    <div class="input__container">
      <input
        type="${type ? type : "text"}"
        placeholder="${placeholder}"
        id="${id}"
        ${type === "checkbox" && value === true ? "checked" : ""}
        name="${name ? name : id}"
        ${value ? `value="${value}"` : ""}
        ${required ? "required" : ""}
      />
    </div>
  </div>
  `;
}
