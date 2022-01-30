let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo');

//для того, чтобы хранить каждое наше сообщение
let todoList = [
    
];

//Для того,чтобы после обновления все сохраненные данные в local storage передавались в html
if(localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

addButton.addEventListener('click', function(){
    if(!addMessage.value) return;
    // let newTodo будет содержать данные нашего сообщения
    let newTodo = {
        todo: addMessage.value, //наш элемент в инпуте
        checked: false, //для того, чтобы показывалось, выполнено ли дело или нет
        important: false 
    };

    //автоматически будет перемещать данные в массив
    todoList.push(newTodo);
    displayMessages();
    //для того, чтобы сохранять данные при обновлении
    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';
});

function displayMessages(){
    //для того, чтобы перебирать все данные в массиве todoList
    let displayMessage = ''; //чтобы добавлять несколько дел
    if(todoList.length === 0) todo.innerHTML = '';
    todoList.forEach(function(item, i){
        displayMessage += `
        <li>
            <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
            <label for='item_${i}' class="${item.important ? 'important' : ' '}">${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessage;
    });
}

//change, если внутри что-то будет меняться , эта фуцнкия для того, чтобы сохранять галчоки в localstoage
todo.addEventListener('change', function(event){
    let idInput = event.target.getAttribute('id');
    let forLabel = todo.querySelector('[for='+ idInput +']');
    let valueLabel = forLabel.innerHTML;

    todoList.forEach(function(item){
        if (item.todo === valueLabel){
            item.checked = !item.checked; //меняем на противоположенное
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

//contextmenuСобытие срабатывает, когда пользователь пытается открыть контекстное меню.
todo.addEventListener('contextmenu', function(e){
    event.preventDefault(); //отключили контекстное меню при нажатии на правую кнпоку мыши
    todoList.forEach(function(item, i){
        if(item.todo === event.target.innerHTML){
            if(event.ctrlKey || event.metaKey){
                todoList.splice(i, 1) //для удаления какого-то элемента
            }else{
            item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })
});