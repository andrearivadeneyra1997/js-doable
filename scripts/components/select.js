export function select({
  id,
  name,
  options = [],
}) {
  return `
  <div class="input">
    <div style="display: flex; flex-direction: row; justify-content: space-between; padding: 12px 18px;">
      <label>${name}</label>
      <select style="width: 235px;" name="${name}" id="${id}">
        ${options?.map(option => `<option value="${option?.value}" ${option?.default && "selected disabled hidden"}>${option?.title}</option>`)}
      </select>
    </div>
  </div>
  `;
}
