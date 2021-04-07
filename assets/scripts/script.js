let usrNameInput = document.getElementById('name');
let usrAgeInput = document.getElementById('age');
appendAddBtn();//add
appendTableData('Gabriel',20);
appendTableData('Ana', 36);

function editBtn(){
    let tdObj = this.parentElement.parentElement;
    let nameObj = tdObj.querySelector('.name-td');
    let ageObj = tdObj.querySelector('.age-td');
    usrNameInput.value = nameObj.textContent;
    usrAgeInput.value = ageObj.textContent;
    appendEditBtns.call(this);//edit
}

function cancelFunc(){
    clearUsrInput();
    appendAddBtn();//add
}

function editFunc(){
    let parentTr = this.parentElement.parentElement;
    let nameField = parentTr.querySelector('.name-td');
    let ageField = parentTr.querySelector('.age-td');
    if(inputCheck(usrNameInput.value, usrAgeInput.value)) return;
    ageField.textContent = usrAgeInput.value;
    nameField.textContent = usrNameInput.value;
    cancelFunc();
}

function appendEditBtns(){
    let actionDiv = removeActionBtns();
    let updateBtnTemp = document.getElementsByTagName('template')[1];
    let btnsClone = updateBtnTemp.content.cloneNode(true);
    let updateBtn = btnsClone.querySelector('.btn-outline-primary');
    let cancelBtn = btnsClone.querySelector('.btn-outline-secondary');
    updateBtn.addEventListener('click', editFunc.bind(this));
    cancelBtn.addEventListener('click', cancelFunc);
    actionDiv.appendChild(btnsClone);
}

function removeActionBtns(){
    let btnDiv = document.querySelector('.action-btns');
    let btns = btnDiv.querySelectorAll('button');
    btns.forEach(item=> item.remove());
    return btnDiv;
}

function appendAddBtn(){
    let actionDiv = removeActionBtns();
    let addBtnTemp = document.getElementsByTagName('template')[2];
    let btnsClone = addBtnTemp.content.cloneNode(true);
    let addBtn = btnsClone.querySelector('.btn-outline-success');
    addBtn.addEventListener('click', defaultAddFunc);
    actionDiv.appendChild(btnsClone);
}

function deleteBtn(){
    this.parentElement.parentElement.remove();
}

function defaultAddFunc(){
    appendTableData(usrNameInput.value, parseInt(usrAgeInput.value));
    clearUsrInput();
}

function clearUsrInput(){
    usrNameInput.value = ''
    usrAgeInput.value = '';
}

function appendTableData(name, age){
    if(inputCheck(name, age)) return;
    let temp = document.getElementsByTagName('template')[0];
    let tempClone = temp.content.cloneNode(true);
    let tempNameTr = tempClone.querySelector('.name-td');
    let tempAgeTr = tempClone.querySelector('.age-td');
    let delBtn = tempClone.querySelector('.btn-outline-secondary');
    let editButn = tempClone.querySelector('.btn-outline-primary');
    delBtn.addEventListener('click', deleteBtn);
    editButn.addEventListener('click', editBtn);
    tempNameTr.textContent = name;
    tempAgeTr.textContent = parseInt(age);
    let table = document.querySelector('.tbody-content');
    table.appendChild(tempClone);
}

function inputCheck(name, age){
    if(!name && !age){
        alert('You need to fill both fields to add a new user!');
        cancelFunc();
        return true;
    }
    if(!name) {
        cancelFunc();
        alert('Invalid name!');
        return true;
    }
    if(isNaN(parseInt(age))|| parseInt(age) <= 0) {
        cancelFunc();
        alert('Invalid age!');
        return true;
    }
}