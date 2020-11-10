export const deleteItem = (e,todoList,displayMessages) => {
    todoList = todoList.filter(item => item.id !== Number(e.target.id));
    localStorage.setItem('todo', JSON.stringify(todoList));
    displayMessages();
};