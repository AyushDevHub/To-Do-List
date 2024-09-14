// Grabs the input field where users will enter their tasks
const inputBox = document.querySelector("#task");

// Selects the container (ul or div) where tasks will be listed
const listContainer = document.querySelector(".list-container");

// Grabs the "Add" button, which the user clicks to add a task
const button = document.querySelector(".addButton");

// Adds a click event listener to the button that calls the addTask function when clicked
button.addEventListener("click", addTask);

/**
 * Function to add a new task to the list
 */
function addTask() {
    // Checks if the input box is empty, and if so, alerts the user
    if (inputBox.value === '') {
        alert("You must write something");
    } 
    // If the input box is not empty, proceed to add the task
    else {
        // Creates a new list item (li) element to store the task
        let li = document.createElement("li");
        // Sets the content of the li to the value entered in the input field
        li.innerHTML = inputBox.value;
        // Appends the new task (li) to the list container
        listContainer.appendChild(li);
        
        // Creates a span element that will serve as the 'remove' (x) button
        let cross = document.createElement("span");
        // Inserts the '×' symbol into the span to represent the remove button
        cross.innerHTML = "\u00d7";
        // Appends the '×' button (span) to the list item (li)
        li.appendChild(cross);
    }
    // Clears the input field after adding the task
    inputBox.value = "";
    // Calls the function to save the current state of the task list to local storage
    saveData();
}

/**
 * Event listener on the list container to handle checking off tasks and deleting tasks.
 * - Toggles the 'checked' class when clicking on a task (li).
 * - Removes a task when clicking the '×' button (span).
 */
listContainer.addEventListener("click", function(e) {
    // Checks if the clicked element is a list item (li)
    if (e.target.tagName === "LI") {
        // Toggles the 'checked' class on the clicked task (li), marking it as complete or incomplete
        e.target.classList.toggle("checked");
        // Saves the updated task list to local storage
        saveData();
    } 
    // Checks if the clicked element is the '×' button (span)
    else if (e.target.tagName == "SPAN") {
        // Removes the parent list item (li) when '×' is clicked
        e.target.parentElement.remove();
        // Saves the updated task list to local storage
        saveData();
    }
}, false);

/**
 * Saves the current state of the task list to the browser's local storage
 * by storing the inner HTML of the list container.
 */
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

/**
 * Loads and displays the saved tasks from local storage when the page is reloaded
 * by setting the inner HTML of the list container to the saved data.
 */
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

// Call the showTask function to display the saved tasks when the page loads
showTask();
