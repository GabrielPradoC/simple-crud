"use strict";
const usrNameInput = document.getElementById('name');
const usrAgeInput = document.getElementById('age');
window.addEventListener('load', () => {
    appendAddBtn();
    createDataOnStorage();
    let dataArray = getArrayFromStorage();
    if (dataArray.length === 0) {
        addToLocalStorage('Gabriel', 20);
        addToLocalStorage('Ana', 36);
        dataArray = getArrayFromStorage();
    }
    dataArray.forEach((person) => {
        const { name, age } = person;
        appendTableData(name, age);
    });
});
function editBtnCallback(tableRowElement) {
    return () => {
        const nameObj = tableRowElement.querySelector('.name-td');
        const ageObj = tableRowElement.querySelector('.age-td');
        usrNameInput.value = nameObj.textContent || "";
        usrAgeInput.value = ageObj.textContent || "";
        appendEditButtons(tableRowElement);
    };
}
function cancelFunc() {
    clearUserInput();
    appendAddBtn();
}
function editFunc(tableRowElement) {
    return () => {
        const TRData = getTRData(tableRowElement);
        const [tableNameElement, tableAgeElement] = TRData;
        const { value: newNameValue } = usrNameInput;
        const { value: newAgeValue } = usrAgeInput;
        const { textContent: oldNameValue } = tableNameElement;
        const { textContent: oldAgeValue } = tableAgeElement;
        if (validateInput(newNameValue, +newAgeValue))
            return;
        updateValueOnStorage((oldNameValue || ''), +(oldAgeValue || 0), newNameValue, +newAgeValue);
        tableAgeElement.textContent = newAgeValue;
        tableNameElement.textContent = newNameValue;
        cancelFunc();
    };
}
function appendEditButtons(tableRowElement) {
    const actionDiv = removeActionBtns();
    const updateBtnTemp = document.getElementsByTagName('template')[1];
    const btnsClone = updateBtnTemp.content.cloneNode(true);
    const updateBtn = btnsClone.querySelector('.btn-outline-primary');
    const cancelBtn = btnsClone.querySelector('.btn-outline-secondary');
    updateBtn.addEventListener('click', editFunc(tableRowElement));
    cancelBtn.addEventListener('click', cancelFunc);
    actionDiv.appendChild(btnsClone);
}
function removeActionBtns() {
    const btnDiv = document.querySelector('.action-btns');
    const btns = btnDiv.querySelectorAll('button');
    btns.forEach((button) => button.remove());
    return btnDiv;
}
function appendAddBtn() {
    const actionDiv = removeActionBtns();
    const addButtonTemplate = document.getElementsByTagName('template')[2];
    const addButtonTemplateClone = addButtonTemplate.content.cloneNode(true);
    const addButton = addButtonTemplateClone.querySelector('.btn-outline-success');
    addButton.addEventListener('click', defaultAddFunc);
    actionDiv.appendChild(addButton);
}
function deleteBtnCallback(tableRowElement) {
    return () => {
        const TRData = getTRData(tableRowElement);
        const dataArray = getArrayFromStorage();
        const [name, age] = TRData;
        const index = dataArray.findIndex((person) => {
            return (person.name === name.textContent &&
                person.age === +(age.textContent || 0));
        });
        dataArray.splice(index, 1);
        localStorage.setItem('data', JSON.stringify(dataArray));
        removeChildrenNodes(tableRowElement);
    };
}
function removeChildrenNodes(node) {
    node.querySelectorAll('*').forEach(element => element.remove());
    node.remove();
}
function defaultAddFunc() {
    appendTableData(usrNameInput.value, +usrAgeInput.value);
    clearUserInput();
}
function clearUserInput() {
    usrNameInput.value = '';
    usrAgeInput.value = '';
}
function appendTableData(name, age) {
    if (validateInput(name, age))
        return;
    const templateClone = retrieveTemplate(name, age);
    addToLocalStorage(name, age);
    const table = document.querySelector('.tbody-content');
    table.appendChild(templateClone);
}
function validateInput(name, age) {
    if (!name && !age) {
        alert('You need to fill both fields to add a new user!');
        cancelFunc();
        return true;
    }
    if (!name || name.match(/[0-9]/)) {
        cancelFunc();
        alert('Invalid name!');
        return true;
    }
    if (isNaN(age) || age <= 0) {
        cancelFunc();
        alert('Invalid age!');
        return true;
    }
    return false;
}
function addToLocalStorage(name, age) {
    if (checkIfExists(name, age))
        return;
    const dataArray = getArrayFromStorage();
    const newEntry = {
        name: name,
        age: age,
    };
    dataArray.push(newEntry);
    localStorage.setItem('data', JSON.stringify(dataArray));
}
function retrieveTemplate(name, age) {
    const tableRowTemplate = document.getElementsByTagName('template')[0];
    const templateFragment = tableRowTemplate.content.cloneNode(true);
    const tableRow = templateFragment.querySelector('tr');
    const nameTableData = tableRow.querySelector('.name-td');
    const ageTableData = tableRow.querySelector('.age-td');
    const deleteButton = tableRow.querySelector('.btn-outline-secondary');
    const editButton = tableRow.querySelector('.btn-outline-primary');
    deleteButton.addEventListener('click', deleteBtnCallback(tableRow));
    editButton.addEventListener('click', editBtnCallback(tableRow));
    nameTableData.textContent = name;
    ageTableData.textContent = String(age);
    return tableRow;
}
function checkIfExists(name, age) {
    const dataArray = getArrayFromStorage();
    return !!dataArray.find((person) => {
        return (person.name === name && person.age === age);
    });
}
function createDataOnStorage() {
    if (!localStorage.getItem('data')) {
        localStorage.setItem('data', JSON.stringify([]));
    }
}
function getTRData(tableRowElement) {
    const nameField = tableRowElement.querySelector('.name-td');
    const ageField = tableRowElement.querySelector('.age-td');
    return [nameField, ageField];
}
function updateValueOnStorage(oldName, oldAge, newName, newAge) {
    const dataArray = getArrayFromStorage();
    const index = dataArray.findIndex((person) => {
        return (person.name === oldName && person.age === oldAge);
    });
    dataArray[index].name = newName;
    dataArray[index].age = newAge;
    localStorage.setItem('data', JSON.stringify(dataArray));
}
function getArrayFromStorage() {
    const localStorageString = localStorage.getItem('data') || '[]';
    const localStorageData = JSON.parse(localStorageString);
    return localStorageData;
}
