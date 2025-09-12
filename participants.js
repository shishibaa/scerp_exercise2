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
        return;
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

tbody.addEventListener("click", (e) => {
    const btn = e.target.closest(".delete-btn");
    if (!btn) return;
    const index = Number(btn.getAttribute("data-index"));
    const list = getList();
    list.splice(index, 1);        
    saveList(list);               
    render(getList());            
});

function doSearch() {
    const q = (searchInput.value || "").trim().toLowerCase();
    const list = getList();
    if (!q) {
        render(list);
        return;
    }
    const filtered = list.filter(p =>
        (p.name || "").toLowerCase().includes(q) ||
        (p.email || "").toLowerCase().includes(q)
    );
    render(filtered);
}
searchBtn.addEventListener("click", doSearch);
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doSearch();
});

render(getList());