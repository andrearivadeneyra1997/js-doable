export function task({
  id,
  title,
  due_date,
  important = false,
  completed = false,
  user_id,
}) {
  return `
    <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 12px;">
      <div style="display: flex; flex-direction: row;">
        <div>
          <div style="display: flex; flex-direction: row;">
            <input class="completed-checkbox" value="${id}" type="checkbox" ${completed ? 'checked' : ''} />
            <b style="margin-left: 10px;">${title}</b>
          </div>
          <div style="font-size: 14px; margin-left: 30px;">${due_date}</div>
        </div>
      </div>
      <div>
        <img class="importance-checkbox" value="${important}" src="${important ? 'important.png' : 'not-important.png'}" />
      </div>
    </div>
  `;
}
