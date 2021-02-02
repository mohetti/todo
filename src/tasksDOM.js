import {folderArray} from "./folderLogic.js";
let bodyDisplay = document.querySelector("#body");

let render = (function render() {
    while (bodyDisplay.firstChild) {
        bodyDisplay.removeChild(bodyDisplay.firstChild);
    }
});

let highlightingFolder = (function highlightingFolder(container, prio) {
    if (prio === "low") {
        container.style.backgroundColor = "green";
    } else if (prio === "med") {
        container.style.backgroundColor = "yellow";
    } else if (prio === "high") {
        container.style.backgroundColor = "red";
    }
})

let displayTasks = (function displayTasks() {
    render();
    let highlightedFolder = folderArray[folderArray.findIndex(x => x.highlight === true)];
    let highlightedTasks = highlightedFolder.tasks;
    for (let i = 0; i < highlightedTasks.length; i++) {
        let listContainer = document.createElement("ul");
        listContainer.classList.add("task-display");
        bodyDisplay.appendChild(listContainer);
        
        let titleDisplay = document.createElement("li");
        listContainer.appendChild(titleDisplay);
        titleDisplay.innerText = highlightedTasks[i].title;

        let dateDisplay = document.createElement("li");
        listContainer.appendChild(dateDisplay);
        dateDisplay.innerText = highlightedTasks[i].date;
        
        highlightingFolder(listContainer, highlightedFolder.tasks[i].prio);
    };

});
let openTask = (function openTask(searchTerm) {
    let highlightedFolder = folderArray[folderArray.findIndex(x => x.highlight === true)];
    let highlightedTasks = highlightedFolder.tasks;

    render();
    let obj = highlightedTasks.findIndex(x => x.title === searchTerm);
    let taskText = document.createElement("h2");
    taskText.id = "task-text";
    bodyDisplay.appendChild(taskText);
    taskText.innerText = searchTerm;

    let dateText = document.createElement("h4");
    dateText.id = "date-text";
    bodyDisplay.appendChild(dateText);
    dateText.innerText = highlightedTasks[obj].date;

    let descrText = document.createElement("div");
    descrText.id = "descr-text";
    bodyDisplay.appendChild(descrText);
    descrText.innerText = highlightedTasks[obj].descr;

    for (let i = 0; i < highlightedTasks[obj].notes.length; i++) {
        let noteContainer = document.createElement("div");
        noteContainer.classList.add("note-container");
        bodyDisplay.appendChild(noteContainer);

        let noteDelete = document.createElement("img");
        noteContainer.appendChild(noteDelete);
        noteDelete.id = "note-delete";
        noteDelete.src="https://image.flaticon.com/icons/png/512/61/61848.png";
        let notesText = document.createElement("div");
        noteContainer.appendChild(notesText);
        notesText.innerText = highlightedTasks[obj].notes[i];
    }
});

let deleteNoteFromDisplay = (function deleteNoteFromDisplay(event) {
    event.target.parentNode.remove();
})

export {displayTasks, render, openTask, deleteNoteFromDisplay};