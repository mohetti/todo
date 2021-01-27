let folderArray = [];

let createFolderObj = function createFolderObj(folderName) {
    let newObj = {};
    newObj["folder"] = folderName.value;
    newObj["index"] = folderArray.length;
    newObj["highlight"] = false;
    return (newObj);
}

let pushToFolderArray = function pushToFolderArray(folderName) {
    folderArray.push(createFolderObj(folderName));
    return folderArray;  
}

let highlightTrue = function highlightTrue(index) {
    folderArray.map(x => x.index === Number(index) ? x.highlight = true : x.highlight = false);
};

let delListItem = (function delListItem(target) {
    console.log("I m working heeere");
    /* let highlighted = folderArray.findIndex();
    console.log(highlighted);
    console.log(folderArray); */

    /*let isHighlighted = folderArray.find(x => x.highlight === true);
    folderArray.splice(isHighlighted[0].index, 1);
    console.log(folderArray);*/
});


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

export {pushToFolderArray, folderArray, highlightTrue, delListItem};