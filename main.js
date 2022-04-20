const todoList = document.querySelector('.todo-list');
const btnAdd = document.getElementById('btn-add');
const todoInput = document.getElementById('todo-input');
const btnSort = document.getElementById('btn-sort');

// Add 

function getTodoItem(todoText) {

    const todoItem = `<div class="todo-item">
                        <div class="todo-item-text">
                            <p>${todoText}</p>
                        </div>
                        <div class="todo-item-delete">
                            <i class="fa-regular fa-circle-xmark"></i>
                        </div>
                    </div>`
    return todoItem;

}

btnAdd.addEventListener('click', () => {
        const todoItem = getTodoItem(todoInput.value);
        todoList.insertAdjacentHTML('beforeend', todoItem);
        todoInput.value = '';
});


// Delete 
todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-circle-xmark')) {
        e.target.parentElement.parentElement.remove();
    }
});


//Sort icon 
function changeSortIcon(sortIcon) {
    if (sortIcon.classList.contains('fa-arrow-down-short-wide')) {
        sortIcon.classList.remove('fa-arrow-down-short-wide');
        sortIcon.classList.add('fa-arrow-up-short-wide');
    } else {
        sortIcon.classList.remove('fa-arrow-up-short-wide');
        sortIcon.classList.add('fa-arrow-down-short-wide');
    }
}

// Sort 
function compare(firstElement, secondElement) {
    if (firstElement.querySelector('p').innerText > secondElement.querySelector('p').innerText) {
        return 1;
    } else if (firstElement.querySelector('p').innerText < secondElement.querySelector('p').innerText) {
        return -1;
    } else {
        return 0;
    }
}
function sortTodoByText(sortIcon) {
    const todoArray = Array.from(todoList.children);
    todoArray.sort((a, b) => {
        if (sortIcon.classList.contains('fa-arrow-down-short-wide')) {
            return compare(a, b);
        } else {
            return compare(b, a);
        }
    });

    todoList.innerHTML = '';
    todoArray.forEach(element => {
        todoList.appendChild(element);
    });
    changeSortIcon(sortIcon);
}
btnSort.addEventListener('click', () => {
    const sortIcon = btnSort.querySelector('i');
    sortTodoByText(sortIcon);
});
