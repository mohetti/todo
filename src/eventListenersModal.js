import {folderArray} from "./folderLogic.js";
let taskTitle = document.querySelector("#task-title");
let taskDescr = document.querySelector("#task-descr");
let prioHigh = document.querySelector("#high");
let prioMed = document.querySelector("#medium");
let prioLow = document.querySelector("#low");
let taskNotes = document.querySelector("#task-notes");
let taskDate = document.querySelector("#task-date");


let setDefault = (function setDefault() {
    modalBg.classList.remove("bg-active");
    taskTitle.value = "";
    taskDescr.value = "";
    prioHigh.checked = false;
    prioMed.checked = false;
    prioLow.checked = false;
    taskNotes.value = "";
    taskDate.value = "";
});

// opens modal to create new task
let updateArray;
let refArray;
let modalBg = document.querySelector(".modal-bg");
let openModal = (function openModal(update, reference) {

    
    if (update === true) {
        refArray = reference;
        updateArray = update;
        modalBg.classList.add("bg-active");
        return updateArray, refArray;
    };
    if (folderArray.findIndex(x => x.highlight === true) !== -1) {
        setDefault();
        modalBg.classList.add("bg-active");
    };
});

// closes modal
let closeModal = (function closeModal() {
    setDefault();
    updateArray = false;
    refArray = false;
    return updateArray, refArray;
});
// ***************************************************************************************************************************
// submits new task
let submitTask = (function submitTask() {
    let appendTo  = folderArray[folderArray.findIndex(x => x.highlight === true)];
    let duplicateTasks = appendTo.tasks.findIndex(x => x.title === taskTitle.value);
    if (duplicateTasks !== -1 && updateArray !== true) {
        return alert("You already have a task with this title.");
    }
    if (taskTitle.value === "") {
        return alert("Please enter a title");
    } else if (prioHigh.checked === false && prioMed.checked === false && prioLow.checked === false) {
        return alert("Please choose a priority");
    } else if (updateArray === true) {
        import("./tasks.js").then(update => {
            update.updateTask(appendTo, refArray);
        });
        updateArray = false;
    } else {
        import("./tasks.js").then(append => {
            append.appendTaskToFolder(appendTo);
        });
    };
});

export {openModal, closeModal, submitTask, setDefault, taskTitle, taskDescr, taskDate, prioHigh, prioLow, prioMed, taskNotes}