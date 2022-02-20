type TPerson = {
    name: string,
    age: number
};

const usrNameInput = document.getElementById('name')as HTMLInputElement;
const usrAgeInput = document.getElementById('age') as HTMLInputElement;

window.addEventListener('load', (): void => {
    appendAddBtn();
    createDataOnStorage();
    let dataArray: Array<TPerson> = getArrayFromStorage();
    if (dataArray.length === 0) {
        addToLocalStorage('Gabriel', 20);
        addToLocalStorage('Ana', 36);
        dataArray = getArrayFromStorage();
    }
    dataArray.forEach((person: TPerson): void => {
        const { name, age } = person;
        appendTableData(name, age);
    });
});

function editBtnCallback(tableRowElement: HTMLTableRowElement): VoidFunction {
    return (): void => {
        const nameObj = tableRowElement.querySelector('.name-td') as HTMLTableCellElement;
        const ageObj = tableRowElement.querySelector('.age-td') as HTMLTableCellElement;
        usrNameInput.value = nameObj.textContent || "";
        usrAgeInput.value = ageObj.textContent || "";
        appendEditButtons(tableRowElement);
    }
   
}

function cancelFunc(): void {
    clearUserInput();
    appendAddBtn();
}

function editFunc(tableRowElement: HTMLTableRowElement): VoidFunction {
    return (): void => {
        const TRData: Array<HTMLTableCellElement> = getTRData(tableRowElement);
        const [ tableNameElement , tableAgeElement ]= TRData;
        const { value: newNameValue } = usrNameInput;
        const { value: newAgeValue } = usrAgeInput;
        const { textContent: oldNameValue} = tableNameElement;
        const { textContent: oldAgeValue } = tableAgeElement;
        if (validateInput(newNameValue, +newAgeValue)) return;
        updateValueOnStorage(
            (oldNameValue || ''),
            +(oldAgeValue || 0),
            newNameValue,
            +newAgeValue,
        );
        tableAgeElement.textContent = newAgeValue;
        tableNameElement.textContent = newNameValue;
        cancelFunc();
    }
}

function appendEditButtons(tableRowElement: HTMLTableRowElement): void {
    const actionDiv: HTMLDivElement = removeActionBtns();
    const updateBtnTemp = document.getElementsByTagName('template')[1];
    const btnsClone = updateBtnTemp.content.cloneNode(true) as HTMLTemplateElement;
    const updateBtn = btnsClone.querySelector('.btn-outline-primary') as HTMLButtonElement;
    const cancelBtn = btnsClone.querySelector('.btn-outline-secondary') as HTMLButtonElement;
    updateBtn.addEventListener('click', editFunc(tableRowElement));
    cancelBtn.addEventListener('click', cancelFunc);
    actionDiv.appendChild(btnsClone);
}

function removeActionBtns() {
    const btnDiv = document.querySelector('.action-btns') as HTMLDivElement;
    const btns = btnDiv.querySelectorAll('button');
    btns.forEach((button) => button.remove());
    return btnDiv;
}

function appendAddBtn(): void {
    const actionDiv: HTMLDivElement = removeActionBtns();
    const addButtonTemplate = document.getElementsByTagName('template')[2];
    const addButtonTemplateClone = addButtonTemplate.content.cloneNode(true) as HTMLTemplateElement;
    const addButton = addButtonTemplateClone.querySelector('.btn-outline-success') as HTMLButtonElement;
    addButton.addEventListener('click', defaultAddFunc);
    actionDiv.appendChild(addButton);
}

function deleteBtnCallback(tableRowElement: HTMLTableRowElement): VoidFunction {
    return (): void => {
        const TRData = getTRData(tableRowElement);
        const dataArray: Array<TPerson> = getArrayFromStorage();
        const [ name, age ] = TRData;
        const index: number = dataArray.findIndex((person) => {
        return (
                person.name === name.textContent &&
                person.age === +(age.textContent || 0)
            );
        });
        dataArray.splice(index, 1);
        localStorage.setItem('data', JSON.stringify(dataArray));
        
        removeChildrenNodes(tableRowElement);
    };
}

function removeChildrenNodes(node: Element): void{
    node.querySelectorAll('*').forEach(element => element.remove());
    node.remove();
}

function defaultAddFunc(): void {
    appendTableData(usrNameInput.value, +usrAgeInput.value);
    clearUserInput();
}

function clearUserInput(): void {
    usrNameInput.value = '';
    usrAgeInput.value = '';
}

function appendTableData(name: string, age: number): void {
    if (validateInput(name, age)) return;
    const templateClone = retrieveTemplate(name, age);
    addToLocalStorage(name, age);
    const table = document.querySelector('.tbody-content')as HTMLTableElement;
    table.appendChild(templateClone);
}

function validateInput(name: string, age: number): boolean {
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

function addToLocalStorage(name: string, age: number): undefined | void {
    if (checkIfExists(name, age)) return;
    const dataArray: Array<TPerson> = getArrayFromStorage();
    const newEntry: TPerson = {
        name: name,
        age: age,
    };
    dataArray.push(newEntry);
    localStorage.setItem('data', JSON.stringify(dataArray));
}

function retrieveTemplate(name: string, age: number): HTMLTableRowElement {
    const tableRowTemplate: HTMLTemplateElement = document.getElementsByTagName('template')[0];
    const templateFragment = tableRowTemplate.content.cloneNode(true) as HTMLTableRowElement;
    const tableRow = templateFragment.querySelector('tr') as HTMLTableRowElement;
    const nameTableData = tableRow.querySelector('.name-td') as HTMLTableCellElement;
    const ageTableData = tableRow.querySelector('.age-td') as HTMLTableCellElement;
    const deleteButton = tableRow.querySelector('.btn-outline-secondary') as HTMLButtonElement;
    const editButton = tableRow.querySelector('.btn-outline-primary') as HTMLButtonElement;
    deleteButton.addEventListener('click', deleteBtnCallback(tableRow));
    editButton.addEventListener('click', editBtnCallback(tableRow));
    nameTableData.textContent = name;
    ageTableData.textContent = String(age);
    return tableRow;
}

function checkIfExists(name: string, age: number): boolean {
    const dataArray: Array<TPerson> = getArrayFromStorage();
    return !!dataArray.find((person): boolean => {
        return (person.name === name && person.age === age);
    });
}

function createDataOnStorage(): void {
    if (!localStorage.getItem('data')) {
        localStorage.setItem('data', JSON.stringify([]));
    }
}

function getTRData(tableRowElement: HTMLTableRowElement): Array<HTMLTableCellElement> {
    const nameField = tableRowElement.querySelector('.name-td') as HTMLTableCellElement;
    const ageField = tableRowElement.querySelector('.age-td') as HTMLTableCellElement;
    return [nameField, ageField];
}

function updateValueOnStorage(oldName: string, oldAge: number, newName: string, newAge: number): void {
    const dataArray: Array<TPerson> = getArrayFromStorage();
    const index = dataArray.findIndex((person) => {
        return (person.name === oldName && person.age === oldAge);
    });
    dataArray[index].name = newName;
    dataArray[index].age = newAge;
    localStorage.setItem('data', JSON.stringify(dataArray));
}

function getArrayFromStorage(): Array<TPerson> {
    const localStorageString = localStorage.getItem('data') || '[]';
    const localStorageData: Array<TPerson> = JSON.parse(localStorageString);
    return localStorageData;
}
