const addButton = document.querySelector('.add');
const todo = document.querySelector('.todo');

let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));

    displayMessages()
}

addButton.addEventListener('click', function () {
    const addMessage = document.querySelector('.message');

    if (!addMessage.value) return;

    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false,
        id: Date.now()
    };

    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';
});

function displayMessages() {
    let displayMessage = '';
    if (todoList.length === 0) todo.innerHTML = '';

    todoList.forEach(function (item, i) {
        displayMessage += `
        <li class="container-message">
        <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
        <label for='item_${i}' class="${item.important ? 'important' : ''}">${item.todo}</label>
        <button type='button' onclick="addDeleteItem()"  class='delete-button' id='${item.id}'></button>
</li>
`;
        todo.innerHTML = displayMessage
    });
}

const deleteItem = (e) => {
    todoList = todoList.filter(item => item.id !== Number(e.target.id));
    localStorage.setItem('todo', JSON.stringify(todoList));
    displayMessages();
};

const addDeleteItem = () => todo.addEventListener('click', deleteItem);

todo.addEventListener('change', function (event) {
    const idInput = event.target.getAttribute('id');
    const forLabel = todo.querySelector('[for=' + idInput + ']');
    const valueLabel = forLabel.innerHTML;

    todoList.forEach(function (item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList))
        }
    })
});

todo.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    todoList.forEach(function (item, i) {

        if (item.todo === event.target.innerHTML) {
            item.important = !item.important;
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList))
        }
    })
});

const helpButton = document.querySelector('#help-button');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close')

helpButton.addEventListener('click', function (event) {
    modal.classList.add('is-open');
});

close.addEventListener('click', function (event) {
    modal.classList.remove('is-open');
});
