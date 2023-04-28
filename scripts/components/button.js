export function button({
  content,
  variant = "button-primary",
  type = "submit",
  width = "100%",
  marginTop,
}) {
  return `
    <button style="width: ${width}; margin-top: ${marginTop}" type="${type}" class="${variant}">${content}</button>
  `;
}
