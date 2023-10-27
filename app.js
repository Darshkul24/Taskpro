const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const saveTasksToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDate');
    const taskText = taskInput.value;
    const dueDate = dueDateInput.value;

    if (taskText.trim() === '') {
        alert('Task description cannot be empty');
        return;
    }

    const newTask = {
        id: tasks.length + 1,
        text: taskText,
        dueDate: dueDate,
        completed: false,
    };

    tasks.push(newTask);
    taskInput.value = '';
    dueDateInput.value = '';

    saveTasksToLocalStorage();
    renderTasks();
};

const toggleTaskStatus = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
    }

    saveTasksToLocalStorage();
    renderTasks();
};

const deleteTask = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
    }

    saveTasksToLocalStorage();
    renderTasks();
};

const renderTasks = () => {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTaskStatus(${task.id})">
            <span class="${task.completed ? 'line-through text-gray-500' : ''}">${task.text} (Due: ${task.dueDate})</span>
            <button class="text-red-500 ml-4" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(listItem);
    });
};

document.getElementById('addTask').addEventListener('click', addTask);
renderTasks();
