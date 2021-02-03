// concerns folderLogic.js and domFolder.js
let folderName = document.getElementById("new-folder");
let folderDisplay = document.getElementById("folder-ul");
import {folderArray} from "./folderLogic.js";

let handleNewFolder = (function handleNewFolder() {
    let duplicatesTrue = folderArray.findIndex(x => x.folder === folderName.value);
    if (folderName.value === "") {
        return;
    } else if (duplicatesTrue === -1 || folderArray.length === 0) {
        // populate array with objects for each new folder
        import("./folderLogic.js").then(newFolder => {
            newFolder.pushToFolderArray(folderName);
        });
        // populate the display with one <li> for each new folder
        import("./domFolder.js").then(newEntry => {
            newEntry.newFolder(folderDisplay, folderName);
        });
    }
});

// highlighting one folder (obj.highlight = true) and backgroundcolor = color
let highlight = (function highlight(event) {
    if (event.target.id === "folder-ul") {
        return;
    } else {
        let innerText = event.target.innerText;
            import("./folderLogic.js").then(highlighting => {
                highlighting.highlightTrue(innerText);
        });
            import("./domFolder.js").then(highlightCSS => {
                highlightCSS.styleHighlightedFolder(event.target);
        });
        import("./tasksDOM.js").then(display => {
            display.displayTasks();
        });
        import ("./domFolder.js").then(display => {
            display.showModal();
        });
    };
});

// pop up right-click menu
let rightClickMenu = (function rightClickMenu(event) {
    event.preventDefault();
    if (event.target.classList.contains("highlight")) {
        import("./domFolder.js").then(rightClick => {
            rightClick.rightClickHandler(event)  
        });
    } else {
        return;
    }
});

let taskMenu = document.getElementById("task-menu");
let storedTask;
let editTaskMenu = (function editTaskMenu(event) {
    
    if (event.target.classList.contains("task-display")) {
        storedTask = event.target;
        event.preventDefault();
        taskMenu.style.top = event.clientY + 10 + "px";
        taskMenu.style.left = event.clientX + 10 + "px";
        taskMenu.classList.add("active");
        return storedTask;
    } else if (event.target.parentNode.classList.contains("task-display")) {
        event.preventDefault();
    };
});

let handleEdit = (function handleEdit(event) {
    if (event.target.classList.contains("right-click")) {
        let update = true;
        let reference = storedTask.childNodes[1].innerText;
        import("./eventListenersModal.js").then(modal => {
            modal.openModal(update, reference);
            taskMenu.classList.remove("active");  
        });
    } else if (taskMenu.classList.contains("active")) {
        taskMenu.classList.remove("active");
    } else {
        return;
    }
})

// delete a Folder
let deleteFolder = (function deleteFolder(event) {
    import("./domFolder.js").then(delItem => {
        delItem.delFromList()  
    });
    import("./folderLogic.js").then(delItem => {
        delItem.delListItem()  
    });
});

let getTaskName = (function getTaskName(event) {
    if (event.target.id === "body") {
        return;
    } else if(event.target.id === "task-delete") {
        import("./tasksDOM.js").then(delTask => {
            delTask.deleteTaskDom(event)  
        });
        import("./tasks.js").then(delTask => {
            delTask.deleteTask(event)  
        });
    } else if (event.target.classList.contains("task-display") || 
      event.target.parentElement.classList.contains("task-display")) {
        let searchTerm;;
        event.target.firstChild.innerText === "" ? searchTerm = event.target.childNodes[1].firstChild.nodeValue : 
                                                          searchTerm = event.target.parentNode.childNodes[1].innerText;
        
        import("./tasksDOM.js").then(open => {
            open.openTask(searchTerm)  
        });
        import("./domFolder.js").then(close => {
            close.closeModal()  
        });
    } else if (event.target.id === "note-delete") {
        // delete from Array
        import("./tasks.js").then(delNote => {
            delNote.deleteNote(event)  
        });
        //delete from display
        import("./tasksDOM.js").then(delNote => {
            delNote.deleteNoteFromDisplay(event)  
        });
    } else if (event.target.parentNode.className === "note-container") {
        import("./tasksDOM.js").then(strike => {
            strike.strikeThrough(event)  
        });
        
    } else if (event.target.id === "go-back" || event.target.id === "go-back-icon") {
        import("./tasksDOM.js").then(display => {
            display.displayTasks();
        });
        import ("./domFolder.js").then(display => {
            display.showModal();
        });
    } else if (event.target.id === "del-task" || event.target.id === "del-task-icon") {
        let deletedTask = event.target.parentNode.dataset.parent;
        import("./tasksDOM.js").then(display => {
            display.displayTasks();
        });
        import ("./domFolder.js").then(display => {
            display.showModal();
        });
        import("./tasksDOM.js").then(delTask => {
            delTask.deleteAll(deletedTask)  
        });
        import("./tasks.js").then(delTask => {
            delTask.deleteAllInArray(deletedTask)  
        });
    };
});

export {handleNewFolder, highlight, rightClickMenu, deleteFolder, getTaskName, editTaskMenu, handleEdit};