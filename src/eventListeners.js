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
    } else if (event.target.classList.contains("task-display") || 
      event.target.parentElement.classList.contains("task-display")) {
        let searchTerm;
        event.target.firstChild.innerText === undefined ? searchTerm = event.target.parentElement.firstChild.innerText : 
                                                          searchTerm = event.target.firstChild.innerText;
        
        import("./tasksDOM.js").then(open => {
            open.openTask(searchTerm)  
        });
    };
});

export {handleNewFolder, highlight, rightClickMenu, deleteFolder, getTaskName};