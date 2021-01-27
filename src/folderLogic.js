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

export {pushToFolderArray, folderArray, highlightTrue};