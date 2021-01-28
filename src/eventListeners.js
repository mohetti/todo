let folderName = document.getElementById("new-folder");
let folderDisplay = document.getElementById("folder-ul");
import {folderArray} from "./folderLogic.js"

let handleNewFolder = (function handleNewFolder() {
    let duplicatesTrue = folderArray.findIndex(x => x.folder === folderName.value);
    if (duplicatesTrue === -1 || folderArray.length === 0) {
        // populate array with objects for each new folder
        import("./folderLogic.js").then(newFolder => {
            newFolder.pushToFolderArray(folderName);
        });
        // populate the display with one <li> for each new folder
        import("./domFolder.js").then(newEntry => {
            newEntry.newFolder(folderDisplay);
        });
    }
});

// highlighting one folder (obj.highlight = true) and backgroundcolor = color
let highlight = (function highlight(event) {
    console.log(event.target);
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


export {handleNewFolder, highlight, rightClickMenu, deleteFolder};