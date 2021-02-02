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


export {appendTaskToFolder};