// npx webpack --watch
import {getLocalStorage, getArray} from "./localStorage.js";
import {folderArray} from "./folderLogic.js";
if (window.localStorage.length !== 0) {
    getLocalStorage();
}
// 2 EventListeners: Add a new folder to the DOM-list as <li> and to the Container-Array as object
let btnNewFolder = document.querySelector("#add-new-btn");
import {handleNewFolder} from "./eventListeners.js"
btnNewFolder.addEventListener("click", handleNewFolder);



// EventListener to highlight one folder, delete it or rename it
let folderActions = document.querySelector("#folder-ul");
import {highlight} from "./eventListeners.js";
folderActions.addEventListener("click", highlight);


//eventlistener for right-click inside folder-list. Pops up a custom right-click menu
import {rightClickMenu, deleteFolder} from "./eventListeners.js";
folderActions.addEventListener("contextmenu", rightClickMenu);
// removes the right click menu or deletes a folder and the object from array
window.addEventListener("click", function(event) {
    if (event.target.classList[0] === "right-click-item") {
        deleteFolder(event);
    } else {
    document.getElementById("menu").classList.remove("active");
    }
});

import {editTaskMenu} from "./eventListeners.js";
window.addEventListener("contextmenu", editTaskMenu);

// open Modal to create a new task
let btnOpenModal = document.querySelector(".open-modal");
import {openModal, closeModal, submitTask} from "./eventListenersModal.js";
btnOpenModal.addEventListener("click", openModal);

// close Modal
let bntCloseModal = document.querySelector(".modal-close");
bntCloseModal.addEventListener("click", closeModal);

let modalSubmit = document.querySelector("#task-subm");
modalSubmit.addEventListener("click", submitTask);

// open a  task to see it's details
import {getTaskName} from "./eventListeners.js";
let taskDisplay = document.querySelector("#body");
taskDisplay.addEventListener("click", getTaskName);

import {handleEdit} from "./eventListeners.js";
window.addEventListener("click", handleEdit);