import {folderArray} from "./folderLogic.js";
import { setLocalStorage } from "./localStorage.js";
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

        let taskDelete = document.createElement("img");
        listContainer.appendChild(taskDelete);
        taskDelete.id = "task-delete";
        taskDelete.src="https://image.flaticon.com/icons/png/512/61/61848.png";
        
        let titleDisplay = document.createElement("li");
        listContainer.appendChild(titleDisplay);
        titleDisplay.innerText = highlightedTasks[i].title;

        let dateDisplay = document.createElement("li");
        listContainer.appendChild(dateDisplay);
        dateDisplay.innerText = highlightedTasks[i].date;
        
        highlightingFolder(listContainer, highlightedFolder.tasks[i].prio);
    };

});

let goBack = document.querySelector("#go-back");
let overallDelete = document.querySelector("#del-task");
let displayDelAndBackIcon = (function displayDelAndBackIcon(input) {
    goBack.style.visibility = "visible";
    bodyDisplay.appendChild(goBack);

    overallDelete.style.visibility = "visible";
    bodyDisplay.appendChild(overallDelete);
    overallDelete.dataset.parent = input;
});

let displayTitle = (function displayTitle(input) {
    let taskText = document.createElement("h2");
    taskText.id = "task-text";
    bodyDisplay.appendChild(taskText);
    taskText.innerText = input;
});

let displayDate = (function displayDate(input, highlight) {
    let dateText = document.createElement("h4");
    dateText.id = "date-text";
    bodyDisplay.appendChild(dateText);
    dateText.innerText = highlight[input].date;
});

let displayDescr = (function displayDescr(input, highlight) {
    let descrText = document.createElement("div");
    descrText.id = "descr-text";
    bodyDisplay.appendChild(descrText);
    descrText.innerText = highlight[input].descr;
});

let openTask = (function openTask(searchTerm) {
    let highlightedFolder = folderArray[folderArray.findIndex(x => x.highlight === true)];
    let highlightedTasks = highlightedFolder.tasks;

    render();
    displayDelAndBackIcon(searchTerm);
    displayTitle(searchTerm);
    let obj = highlightedTasks.findIndex(x => x.title === searchTerm);
    displayDate(obj, highlightedTasks);
    displayDescr(obj, highlightedTasks);

// display notes
    if (highlightedTasks[obj].notes[0] !== "") {
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
            if (highlightedTasks[obj].strike[i] === true) {
                notesText.id = "strike-through";
            };
        };
    };
});

let deleteNoteFromDisplay = (function deleteNoteFromDisplay(event) {
    event.target.parentNode.remove();
})

let deleteTaskDom = (function deleteTaskDom(event) {
    event.target.parentNode.remove();
});

let deleteAll = (function deleteAll(searchTerm) {
    let liTags = document.getElementsByTagName("li");
    let found;
    for (let i = 0; i < liTags.length; i++) {
        if (liTags[i].innerText === searchTerm) {
            found = liTags[i];
        }
    }
    found.parentElement.remove();
})

let strikeThrough = (function strikeThrough(event) {
    if (event.target.id === "strike-through") {
        event.target.removeAttribute("id");
        import("./tasks.js").then(strikeFalse => {
            strikeFalse.strikeFalse(event)  
        });
    } else {
        event.target.id = "strike-through";
        import("./tasks.js").then(strikeTrue => {
            strikeTrue.strikeTrue(event)  
        });
    }
});



export {displayTasks, render, openTask, deleteNoteFromDisplay, deleteTaskDom, strikeThrough, deleteAll};