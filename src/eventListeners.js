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
});

// delete a Folder
/*let deleteFolder = (function deleteFolder(event) {
    let isHighlighted = folderArray.filter(x => x.index === Number(event.target.dataset.indexNumber))[0].highlight;
    if (isHighlighted === true) {
        console.log("true");
    } else {
        console.log("false");
    }
    
    /*
    this could be helpful for deleting and adding new Entrys
    import("./folderLogic.js").then(newFolder => {
       let a = newFolder.folderArray.filter(element => element.folder === "test");
       console.log(a);
       a[0].k = "k"
       });

});*/


export {handleNewFolder, highlight};