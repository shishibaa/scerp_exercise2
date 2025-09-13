const STORAGE_KEY = 'seminarParticipants';
const searchInput = document.getElementById("search");
const searchBtn = document.querySelector(".search-btn");
const tbody = document.getElementById("parti-table-body");


function getList() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}
function saveList(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function render(list) {
    tbody.innerHTML = "";
    if (!list.length) {
        tbody.innerHTML = `<tr><td style="padding: 15px; text-align: center;" colspan="4">No participants yet.</td></tr>`;
    }

    list.forEach((p, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.email}</td>
      <td>${p.phone}</td>
      <td><button data-index="${index}" class="delete-btn" style="background-color: #ff4343ff;
    cursor: pointer;
    border-radius: 3px;
    color: white;
    border: none; padding: 5px 10px; ">Delete</button></td>
    `;
        tbody.appendChild(tr);
    });

}

function deleteItem(index) {
    const list = getList();
    list.splice(index, 1);
    saveList(list);
    render(list);
}

tbody.addEventListener("click", (e) => {
    const btn = e.target.closest(".delete-btn");
    const index = Number(btn.dataset.index);
    if (Number.isInteger(index)) deleteItem(index);
});

function doSearch() {
    const sInput = (searchInput.value || "").trim().toLowerCase();
    const list = getList();
    if (!sInput) {
        render(list);
    }
    const filtered = list.filter(p =>
        (p.name || "").toLowerCase().includes(sInput) ||
        (p.email || "").toLowerCase().includes(sInput)
    );
    render(filtered);
}
searchBtn.addEventListener("click", doSearch);

render(getList());