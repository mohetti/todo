let folderName = document.getElementById("new-folder");
let folderDisplay = document.getElementById("folder-ul");

let handleNewFolder = (function handleNewFolder() {
    // populate array with objects for each new folder
    import("./folderLogic.js").then(newFolder => {
        newFolder.pushToFolderArray(folderName);
    });
    // populate the display with one <li> for each new folder
    import("./domFolder.js").then(newEntry => {
        newEntry.newFolder(folderDisplay);
    });
});

// highlighting one folder (obj.highlight = true) and backgroundcolor = color
let highlight = (function highlight(event) {
    let indexNumber = event.target.dataset.indexNumber;
    import("./folderLogic.js").then(highlighting => {
        highlighting.highlightTrue(indexNumber);
    });
    import("./domFolder.js").then(highlightCSS => {
        highlightCSS.styleHighlightedFolder(event.target);
    });
});

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
        delItem.delFromList(event.target)  
    });
    import("./folderLogic.js").then(delItem => {
        delItem.delListItem(event.target)  
    });
});


export {handleNewFolder, highlight, rightClickMenu, deleteFolder};