//#region Core functions
function updateText(event) {
    const joinedText = getJoinedText();
    document.getElementById("joined").value = joinedText;
}

function getJoinedText() {
    const inputText = document.getElementById("textInput").value;

    // split by line break (can be customized - split by $ or whatever)
    let separatorOld = getOldSeparator();

    const splitText = inputText.split(separatorOld);

    // trim text (can be toggled)
    const trimmed = splitText.map(x => x.trim())

    // join by something
    let separatorNew = getNewSeparator();
    const joinedText = trimmed.join(separatorNew);
    console.log(joinedText);

    return joinedText;
}

function copy() {
    document.getElementById("joined").select();
    document.execCommand('copy');
}

function removeDuplicates() {
    document.getElementById("duplicateInfoTitle").classList.remove('hidden');

    const original = document.getElementById("joined").value;
    if (!original) {
        return;
    }

    let separatorNew = getNewSeparator();
    const originalItemsArray = original.split(separatorNew);

    document.getElementById("duplicateInfo").innerHTML = getDuplicateItemInfo(originalItemsArray) || '';

    const uniqueValues = Array.from(new Set(originalItemsArray));
    document.getElementById("joined").value = uniqueValues.join(separatorNew);
}

function getDuplicateItemInfo(originalItemsArray) {
    const duplicates = [];
    for (let i = 0; i < originalItemsArray.length; i++) {
        const currentItem = originalItemsArray[i];
        if (duplicates.find(x => x.item === currentItem)) {
            continue;
        }

        const sliced = originalItemsArray.slice(i);
        const occurences = sliced.filter(item => item === currentItem);

        if (occurences.length > 1) {
            duplicates.push({ item: currentItem, count: occurences.length });
        }
    }

    if (duplicates.length === 0) {
        return;
    }

    const reducer = (acc, x) => acc += `<br/>${x.item} (${x.count} occurences)`;
    return duplicates.reduce(reducer, '');
}
//#endregion

//#region Separators
function getNewSeparator() {
    let separatorNew = document.getElementById("separatorNew").value || ',';
    if (['\\n', 'new line'].includes(separatorNew)) {
        separatorNew = '\n';
    }
    return separatorNew;
}

function getOldSeparator() {
    return document.getElementById("separatorOld").value || '\n';
}
//#endregion



// undo remove duplicates
// pending: mobile view
// pending: toggle trim text