//#region Core functions
function updateText() {
    let formattedArray = getInputText();
    document.getElementById("totalRecords").textContent = `Total: ${formattedArray.length} records`;
    const joinedText = getJoinedText(formattedArray);
    document.getElementById("joined").value = joinedText;
}

function transform() {
    animate("transformAnimated");
    updateText();
    const inputText = getInputText();
    if (inputText.length > new Set(inputText).size) {
        document.getElementById("foundDuplicates").classList.remove("hidden");
    } else {
        document.getElementById("foundDuplicates").classList.add("hidden");
    }
}

function copy() {
    animate("copyAnimated");
    document.getElementById("joined").select();
    document.execCommand('copy');
}

function removeDuplicates() {
    animate("removeDuplicatesAnimated");
    document.getElementById("duplicateInfoTitle").classList.remove("hidden");
    document.getElementById("foundDuplicates").classList.add("hidden");

    const original = document.getElementById("joined").value;
    if (!original) {
        return;
    }

    let separatorNew = getNewSeparator();
    const originalItemsArray = original.split(separatorNew);

    document.getElementById("duplicateInfo").innerHTML = getDuplicateItemInfo(originalItemsArray) || '';

    const uniqueValues = Array.from(new Set(originalItemsArray));
    document.getElementById("totalRecords").textContent = `Total: ${uniqueValues.length} records`;
    document.getElementById("joined").value = uniqueValues.join(separatorNew);
}

const themeLibrary = {
    horse: {
        transformButton: ['bg-blue-700'],
        removeDuplicatesButton: ['bg-blue-700'],
        copyButton: ['bg-blue-700'],
        body: ["none"],
        mode: ["bg-green-400"],
        titleText: ["title-text-basic"],
        oldSeparatorLabel: ["text-blue-700"],
        newSeparatorLabel: ["text-blue-700"],
        oldSeparatorInput: ["bg-grey-300"],
        newSeparatorInput: ["bg-grey-300"],
        textInput: ["bg-grey-300"],
        duplicateInfoTitle: ["text-blue"],
        joined: ["bg-grey-300"],
        totalRecords: ["text-blue-700"]
    },
    unicorn: {
        transformButton: ['bg-orange-500'],
        removeDuplicatesButton: ['bg-pink-500'],
        copyButton: ['bg-indigo-400'],
        body: ["bg-colorful"],
        mode: ["bg-pink-300"],
        titleText: ["text-colorful"],
        oldSeparatorLabel: ["text-pink-700"],
        newSeparatorLabel: ["text-pink-700"],
        oldSeparatorInput: ["bg-pink-200"],
        newSeparatorInput: ["bg-pink-200"],
        textInput: ["bg-orange-200"],
        duplicateInfoTitle: ["text-orange-700"],
        joined: ["bg-indigo-200"],
        totalRecords: ["text-pink-600"]
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

function getJoinedText(formattedArray) {
    let separatorNew = getNewSeparator();
    const joinedText = formattedArray.join(separatorNew);
    return joinedText;
}

function getInputText() {
    const inputText = document.getElementById("textInput").value;

    let separatorOld = getOldSeparator();
    const inputArray = inputText.split(separatorOld);

    const trim = true; // toggle
    return trim ? inputArray.map(x => x.trim()) : inputArray;
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