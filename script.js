document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const deleteBtn = document.getElementById('delete-btn');

    addBtn.addEventListener('click', addOrUpdateTodo);
    deleteBtn.addEventListener('click', deleteSelectedOrAllTodos);

    function addOrUpdateTodo() {
        const todoText = input.value.trim();
        if (todoText === '') return;

        const todoId = input.dataset.todoId;
        if (todoId) {
            updateTodo(todoId);
        } else {
            addTodo(todoText);
        }
    }

    function addTodo(todoText) {
        const li = document.createElement('li');

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.addEventListener('change', function() {
            li.classList.toggle('selected', checkbox.checked);
            checkSelectedItems();
        });

        // Append checkbox to list item
        li.appendChild(checkbox);

        const timeSpan = document.createElement('span');
        timeSpan.className = 'todo-time';
        const date = new Date();
        const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const dateString = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        timeSpan.textContent = ` [${dateString} ${timeString}]`;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        editBtn.addEventListener('click', function() {
            input.value = todoText;
            input.dataset.todoId = li.id;
            addBtn.textContent = 'Update';
        });

        // Create todo text
        const todoTextNode = document.createTextNode(todoText);
        li.appendChild(todoTextNode);

        li.appendChild(timeSpan);
        li.appendChild(editBtn);
        
        const existingTodo = document.getElementById(input.dataset.todoId);
        if (existingTodo) {
            const existingTimeSpan = existingTodo.querySelector('.todo-time');
            li.insertBefore(existingTimeSpan, li.firstChild); // Insert existing time span before text content
            existingTodo.replaceWith(li); // Replace existing todo item with the edited one
            input.value = '';
            input.removeAttribute('data-todo-id');
            addBtn.textContent = 'Add';
        } else {
            li.id = 'todo' + Date.now();
            todoList.appendChild(li);
            input.value = '';
        }
    }

    function updateTodo(todoId) {
        const editedTodoText = input.value.trim();
        const todoItem = document.getElementById(todoId);
        if (todoItem && editedTodoText !== '') {
            const date = new Date();
            const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            const dateString = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
            const timeSpan = document.createElement('span');
            timeSpan.className = 'todo-time';
            timeSpan.textContent = ` [${dateString} ${timeString}]`;
            todoItem.textContent = editedTodoText; // Update existing todo item's text content
            todoItem.appendChild(timeSpan); // Append time span
            input.value = '';
            input.removeAttribute('data-todo-id');
            addBtn.textContent = 'Add';
        }
    }

    function deleteSelectedOrAllTodos() {
        const selectedItems = document.querySelectorAll('.todo-checkbox:checked');
        if (selectedItems.length > 0) {
            selectedItems.forEach(item => item.parentElement.remove());
        } else {
            todoList.innerHTML = '';
        }
        checkSelectedItems();
    }

    function checkSelectedItems() {
        const selectedItems = document.querySelectorAll('.todo-checkbox:checked');
        if (selectedItems.length > 0) {
            deleteBtn.textContent = 'Delete';
        } else {
            deleteBtn.textContent = 'Delete All';
        }
    }
});
