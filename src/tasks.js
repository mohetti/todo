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
    let rmDuplicates = [...new Set(notesArray)];
    return rmDuplicates;
});

let strikeChecked = (function strikeChecked(taskArray) {
    let striked = taskArray.map(x => x = false);
    return striked;
});

let appendTaskToFolder = (function appendTaskToFolder(appendTo) {
        let taskObj = {
            title : taskTitle.value,
            descr : taskDescr.value,
            date  : taskDate.value,
            prio  : priority(),
            notes : notesArray(),
            strike : strikeChecked(notesArray()),
        }
        appendTo.tasks.push(taskObj);
        setLocalStorage();
        import("./tasksDOM.js").then(append => {
            append.displayTasks();
        });
        setDefault();
    });

let updateTask = (function updateTask(appendTo, refArray) {
    let targetTask = appendTo.tasks.findIndex(x => x.title === refArray);
    appendTo.tasks[targetTask].title = taskTitle.value;
    appendTo.tasks[targetTask].descr = taskDescr.value;
    appendTo.tasks[targetTask].date = taskDate.value;
    appendTo.tasks[targetTask].prio = priority();
    appendTo.tasks[targetTask].notes = notesArray();
    appendTo.tasks[targetTask].strike = strikeChecked(notesArray());
    console.log(appendTo.tasks[targetTask].notes)
    setLocalStorage();
    import("./tasksDOM.js").then(rend => {
        rend.render();
    });

    import("./tasksDOM.js").then(display => {
        display.displayTasks();
    });

    setDefault();
});

let deleteNote = (function deleteNote(event) {
    let searchTerm = event.target.nextSibling.firstChild.nodeValue;
    let headline = document.querySelector("#task-text").innerText;
    let taskContainer = folderArray[folderArray.findIndex(x => x.highlight === true)];
    let findTask = taskContainer.tasks.findIndex(x => x.title === headline);
    let goToNotes = taskContainer.tasks[findTask].notes;
    let index = goToNotes.findIndex(x => x === searchTerm);
    taskContainer.tasks[findTask].notes.splice(index, 1);
    taskContainer.tasks[findTask].strike.splice(index, 1);
    setLocalStorage();

});

let deleteTask = (function deleteTask(event) {
    let task = event.target.nextSibling.innerText;
    let taskContainer = folderArray[folderArray.findIndex(x => x.highlight === true)];
    let specTask = taskContainer.tasks.findIndex(x => x.title === task);
    taskContainer.tasks.splice(specTask, 1);
    setLocalStorage();
});

let deleteAllInArray = (function deleteAllInArray(searchTerm) {
    let taskContainer = folderArray[folderArray.findIndex(x => x.highlight === true)];
    let specTask = taskContainer.tasks.findIndex(x => x.title === searchTerm);
    taskContainer.tasks.splice(specTask, 1);
    setLocalStorage();
})

let strikeTrue = (function strikeTrue(event) {
    let text = event.target.innerText;
    let taskContainer = folderArray[folderArray.findIndex(x => x.highlight === true)];
    let searchTerm = document.querySelector("#task-text").innerText;
    let specTask = taskContainer.tasks.findIndex(x => x.title === searchTerm);
    let index = taskContainer.tasks[specTask].notes.findIndex(x => x === text);
    
    taskContainer.tasks[specTask].strike[index] = true;
    setLocalStorage();
});

let strikeFalse = (function strikeFalse(event) {
    let text = event.target.innerText;
    let taskContainer = folderArray[folderArray.findIndex(x => x.highlight === true)];
    let searchTerm = document.querySelector("#task-text").innerText;
    let specTask = taskContainer.tasks.findIndex(x => x.title === searchTerm);
    let index = taskContainer.tasks[specTask].notes.findIndex(x => x === text);
    
    taskContainer.tasks[specTask].strike[index] = false;
    setLocalStorage();
})

export {appendTaskToFolder, deleteNote, deleteTask, strikeTrue, strikeFalse, deleteAllInArray, updateTask};