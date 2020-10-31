let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo');

let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages()
}

addButton.addEventListener('click', function () {
    if (!addMessage.value) return;

    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    };

    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';
});

function displayMessages() {
    let displayMessage = '';

    if (todoList === 0) todo.innerHTML = '';

    todoList.forEach(function (item, i) {
        displayMessage += `
        <li>
        <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
        <label for='item_${i}' class="${item.important ? 'important' : ''}">${item.todo}</label>
</li>`;
        todo.innerHTML = displayMessage
    });

}


todo.addEventListener('change', function (event) {
    let idInput = event.target.getAttribute('id');
    let forLabel = todo.querySelector('[for=' + idInput + ']');
    let valueLabel = forLabel.innerHTML;

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
            if (event.ctrlKey || event.metaKey) {
                todoList.splice(i, 1)
            }
            item.important = !item.important;
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList))
        }
    })
});

const helpButton = document.querySelector('#help-button');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');

helpButton.addEventListener('click', function (event) {
    modal.classList.add('is-open');
});

close.addEventListener('click', function (event) {
    modal.classList.remove('is-open');
});

