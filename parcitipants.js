// no participants
const tablebody = document.getElementById("parci-table-body");
const notFoundRow= document.createElement("tr");
const notFound = document.createElement("td");
notFoundRow.appendChild(notFound);
notFound.textContent = "No participants found";
notFound.colSpan = 4;
notFound.style.textAlign = "center";
notFound.style.padding = "20px";
tablebody.appendChild(notFoundRow);