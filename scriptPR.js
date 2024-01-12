const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addBtn = document.getElementById("add-btn");

let selectedLi = null; // Global variable to store the selected li for updating

// creating li 
addBtn.addEventListener("click", () => {
    if (inputBox.value === "") {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        let spanDelete = document.createElement("span");
        spanDelete.innerHTML = "\u00d7";
        li.appendChild(spanDelete);
        
        let spanEdit = document.createElement("div");
        spanEdit.innerHTML = "\u270E";
        spanEdit.addEventListener("click", function() {
            inputBox.value = li.innerHTML.textContent;
            selectedLi = li; // Store the reference of the selected li for updating
        });
        li.appendChild(spanEdit);
        
        listContainer.appendChild(li);
        
        inputBox.value = "";
        saveData();
    }
});

// Event Delegation for Checked/Unchecked and Delete
listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Update functionality when the "Update" button is clicked
addBtn.addEventListener("click", () => {
    if (selectedLi) {
        inputBox.value = selectedLi.firstChild.textContent
        selectedLi.innerHTML = inputBox.value;
        selectedLi = null; // Reset the selectedLi variable after updating
        saveData();
    }
});

// storing data on browser 
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// showing data on browser
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
