//#region Core functions
function updateText() {
    const joinedText = getJoinedText();
    document.getElementById("joined").value = joinedText;
}

function transform() {
    animate("transformAnimated");
    updateText();
}

function copy() {
    animate("copyAnimated");
    document.getElementById("joined").select();
    document.execCommand('copy');
}

function removeDuplicates() {
    animate("removeDuplicatesAnimated");
    document.getElementById("duplicateInfoTitle").classList.remove("hidden");

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

const themeLibrary = {
    horse: {
        transformButton: ['bg-blue-dark'],
        removeDuplicatesButton: ['bg-blue-dark'],
        copyButton: ['bg-blue-dark'],
        body: ["none"],
        mode: ["bg-green-light"],
        titleText: ["title-text-basic"],
        oldSeparatorLabel: ["text-blue-dark"],
        newSeparatorLabel: ["text-blue-dark"],
        oldSeparatorInput: ["bg-grey-lighter"],
        newSeparatorInput: ["bg-grey-lighter"],
        textInput: ["bg-grey-lighter"],
        duplicateInfoTitle: ["text-blue"],
        joined: ["bg-grey-lighter"]
    },
    unicorn: {
        transformButton: ['bg-orange'],
        removeDuplicatesButton: ['bg-pink'],
        copyButton: ['bg-indigo-light'],
        body: ["bg-colorful"],
        mode: ["bg-pink-lighter"],
        titleText: ["title-text-colorful"],
        oldSeparatorLabel: ["text-pink-dark"],
        newSeparatorLabel: ["text-pink-dark"],
        oldSeparatorInput: ["bg-pink-lightest"],
        newSeparatorInput: ["bg-pink-lightest"],
        textInput: ["bg-orange-lightest"],
        duplicateInfoTitle: ["text-orange-dark"],
        joined: ["bg-indigo-lightest"]
    }
}

function toggleMode(event) {
    // mode change
    const oldMode = event.target.id;
    const newMode = event.target.id === 'unicorn' ? 'horse' : 'unicorn';
    document.getElementById(oldMode).classList.add('hidden');
    document.getElementById(newMode).classList.remove('hidden')

    // elements repaint
    const oldTheme = themeLibrary[oldMode];
    const newTheme = themeLibrary[newMode];
    const elements = Object.keys(themeLibrary.horse);
    elements.forEach(elementId => {
        const element = document.getElementById(elementId);
        element.classList.remove(...oldTheme[elementId]);
        element.classList.add(...newTheme[elementId]);
    })
}
//#endregion

//#region Helper functions
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

function animate(elementId) {
    const animation = ['animated', 'tada'];
    document.getElementById(elementId).classList.remove(...animation);
    setTimeout(() => document.getElementById(elementId).classList.add(...animation), 0);
}

function getJoinedText() {
    const inputText = document.getElementById("textInput").value;

    let separatorOld = getOldSeparator();
    const inputArray = inputText.split(separatorOld);

    const trim = true;
    let formattedArray = trim ? inputArray.map(x => x.trim()) : inputArray;

    let separatorNew = getNewSeparator();
    const joinedText = formattedArray.join(separatorNew);
    return joinedText;
}

function getNewSeparator() {
    let separatorNew = document.getElementById("newSeparatorInput").value || ',';
    if (['\\n', 'new line'].includes(separatorNew)) {
        separatorNew = '\n';
    }
    return separatorNew;
}

function getOldSeparator() {
    return document.getElementById("oldSeparatorInput").value || '\n';
}
//#endregion