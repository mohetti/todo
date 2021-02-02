import {folderArray} from "./folderLogic.js";
import {setDefault, taskTitle, taskDescr, taskDate, prioHigh, prioLow, prioMed, taskNotes} from "./eventListenersModal.js";
import {setLocalStorage} from "./localStorage.js";

let priority = (function priority() {
        if (prioHigh.checked === true) {
            return "high";
        } else if (prioMed.checked === true) {
            return "med";
        } else if (prioLow.checked === true) {
            return "low";
        };
})

let notesArray = (function notesArray() {
    let notesArray = taskNotes.value.split(";");
    return notesArray;
})

let appendTaskToFolder = (function appendTaskToFolder(appendTo) {
        let taskObj = {
            title : taskTitle.value,
            descr : taskDescr.value,
            date  : taskDate.value,
            prio  : priority(),
            notes : notesArray()
        }
        appendTo.tasks.push(taskObj);
        setLocalStorage();
        import("./tasksDOM.js").then(append => {
            append.displayTasks();
        });
        setDefault();
    });

let deleteNote = (function deleteNote(event) {
    let searchTerm = event.target.nextSibling.firstChild.nodeValue;
    let headline = document.querySelector("#task-text").innerText;
    let taskContainer = folderArray[folderArray.findIndex(x => x.highlight === true)];
    let findTask = taskContainer.tasks.findIndex(x => x.title === headline);
    let test = taskContainer.tasks[findTask].notes;
    let smth = test.findIndex(x => x === searchTerm);
    taskContainer.tasks[findTask].notes.splice(smth, 1);
    setLocalStorage();

    // Funktioniert nun besser. Aber ein Bug würde immer noch entstehen, wenn in einem Array mehrere Duplikate sind.
    // Implementieren, dass Duplikate vermieden werden.
    // Code schöner schreiben da oben

});

export {appendTaskToFolder, deleteNote};