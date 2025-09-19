const STORAGE_KEY = 'seminarParticipants';
let participantsList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const regisBtn = document.getElementById("regis-btn");
const successMsg = document.getElementById("successful");
const alertMsg = document.getElementById("alert");
const inputName = document.getElementById("name-input");
const inputEmail = document.getElementById("email-input");
const inputPhone = document.getElementById("tel-input");

function addParticipants() {
    const Name = inputName.value;
    const Email = inputEmail.value;
    const Phone = inputPhone.value;
    const ID = Date.now();

    alertMsg.innerHTML = ""
    successMsg.innerHTML = "";

    const participants = {
        name: Name,
        email: Email,
        phone: Phone,
        id: ID
    }

    if (Name.trim() === "" || Email.trim() === "" || Phone === "") {
        alertMsg.innerHTML = "Error: Invalid input.";

        return false;
    }

    const emailOK = /.+@.+\..+/.test(Email);
    if (!emailOK) {
        alertMsg.innerHTML = "Error: Invalid Email format.";

        return false;
    }

    const phoneOK = /^\d{7,15}$/.test(Phone.replace(/\D/g, ""));
    if (!phoneOK) {
        alertMsg.innerHTML = "Invalid phone number (7–15 digits).";


        return false;
    }

    participantsList.push(participants);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(participantsList));
    return true;
}

regisBtn.addEventListener("click", function (e) {
    const add = addParticipants();
    if (!add) {
        e.preventDefault();
    } else {
        successMsg.innerHTML = "Successfully Registered!";
        inputName.value = "";
        inputPhone.value = "";
        inputEmail.value = "";
    }
}
);
