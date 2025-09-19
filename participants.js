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
                    <td class="actions">
                        <button data-id="${p.id}" class="delete-btn" onclick="deleteItem(${p.id})">Delete</button>
                    </td>
                    `;

        tbody.appendChild(tr);
    });

}


function deleteItem(id) {
    let list = getList();
    const targetId = Number(id);
    list = list.filter(item => item.id !== targetId);
    saveList(list);
    render(list);
}


function doSearch() {
    const sInput = (searchInput.value || "").trim().toLowerCase();
    const list = getList();
    if (!sInput) {
        render(list);
        return
    }
    const filtered = list.filter(p =>
        (p.name || "").toLowerCase().includes(sInput) ||
        (p.email || "").toLowerCase().includes(sInput)
    );
    render(filtered);
}

searchBtn.addEventListener('click', doSearch);

render(getList());
window.deleteItem = deleteItem;