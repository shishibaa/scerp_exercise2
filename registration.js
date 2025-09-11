const STORAGE_KEY = 'seminarParticipants';
let participantsList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const regisBtn = document.getElementById("regis-btn");


function addParticipants() {
    const inputName = document.getElementById("name-input").value;
    const inputEmail = document.getElementById("email-input").value;
    const inputPhone = document.getElementById("tel-input").value;
    const participants = {
        name: inputName,
        email: inputEmail,
        phone: inputPhone
    }


    if (inputName.trim() === "" || inputEmail.trim() === "" || inputPhone === "") {
        alert("Error: Invalid input.");
        return;
    }

    const emailOK = /.+@.+\..+/.test(inputEmail);
    if (!emailOK) {
        alert("Invalid email format.");
        return;
    }

    const phoneOK = /^\d{7,15}$/.test(inputPhone.replace(/\D/g, ""));
    if (!phoneOK) {
        alert("Invalid phone number (7–15 digits).");
        return;
    }

    participantsList.push(participants);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(participantsList));
}

regisBtn.addEventListener("click", function (e) {
    addParticipants();
    e.preventDefault();
    document.getElementById("name-input").value = "";
    document.getElementById("email-input").value = "";
    document.getElementById("tel-input").value = "";
}
);
