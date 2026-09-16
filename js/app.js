"use strict";

const $ = (selector, target = document) => target.querySelector(selector);

const uiSelectors = {
    taskInput: $('.task'),
    createTaskBtn: $('.create-task'),
    emptyListPlaceholder: $('.empty-list-placeholder'),
    emptyListLabel: $('.empty-list-label'),
    taskList: $('.task-list ul'),
};

const taskList = [];

const createHtmlElement = (tag, parentElement, attrsProps = {}) => {
    const htmlElement = document.createElement(tag);

    for(const [key, value] of Object.entries(attrsProps)) {
        if(key in htmlElement) {
            htmlElement[key] = value;
        }
        else {
            htmlElement.setAttribute(key, value);
        }
    }

    return parentElement.appendChild(htmlElement);
};

const getTaskInput = () => uiSelectors.taskInput.value.trim();

const getTotalTasks = () => taskList.length;

const validateTask = task => task.trim().length >= 5;

const saveTaskToList = () => {
    taskList.push({
        id: crypto.randomUUID(),
        descr: getTaskInput(),
        completed: false,
        urgent: false,
        timestamp: Date.now(),
    });

    clearTaskInput();
    renderTaskList();
};

const deleteTask = id => {
    if(confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
        const index = taskList.findIndex(task => task.id === id);

        if(index !== -1) {
            taskList.splice(index, 1);
            renderTaskList();
        }
    }
};

const editTask = id => {
    const taskToEdit = taskList.find(task => task.id === id);

    if(!taskToEdit) {
        return null;
    }

    const newTaskDescr = prompt('Edit task description:', taskToEdit.descr);

    if(newTaskDescr === null) {
        return;
    }

    const newTask = newTaskDescr.trim();
    if(validateTask(newTask)) {
        taskToEdit.descr = newTask;
        renderTaskList();
    }
    else {
        alert('The task description should contain at least 5 characters; try again.');
        return;        
    }
};

const toggleTaskCompleted = id => {
    const task = taskList.find(taskItem => taskItem.id === id);
    if(task) {
        task.completed = !task.completed;
        renderTaskList();
    }
};

const clearTaskList = () => uiSelectors.taskList.innerHTML = '';

const clearTaskInput = () => {
    uiSelectors.taskInput.value = '';
    uiSelectors.taskInput.focus();
};

const renderTaskList = () => {
    clearTaskList();

    if(taskList.length > 0) {
        uiSelectors.emptyListLabel.style.display = 'none';
        
        taskList.forEach(task => {
            // Apply a 'completed' class to the <li> wrapper if task.completed is true
            const taskListItem = createHtmlElement('li', uiSelectors.taskList, {
                className: task.completed ? 'completed' : '',
            });

            const completedToggler = createHtmlElement(
                'input',
                createHtmlElement(
                    'div',
                    taskListItem,
                    {
                        className: 'toggle-complete',
                    }
                ),
                {
                    type: 'checkbox',
                    className: 'task-completed',
                    checked: task.completed,
                    'data-id': task.id,
                }
            );

            const taskDescr = createHtmlElement(
                'span',
                createHtmlElement(
                    'div',
                    taskListItem,
                    {
                        className: 'task-descr',
                    }
                ),
                {
                    className: 'task-descr-label',
                    textContent: task.descr,
                }
            );

            const editTaskBtn = createHtmlElement(
                'button',
                createHtmlElement(
                    'div',
                    taskListItem,
                    {
                        className: 'edit-task',
                    }
                ),
                {
                    type: 'button',
                    className: 'edit-task-btn',
                    textContent: 'Edit',
                    'data-id': task.id,
                }
            );

            const deleteTaskBtn = createHtmlElement(
                'button',
                createHtmlElement(
                    'div',
                    taskListItem,
                    {
                        className: 'delete-task',
                    }
                ),
                {
                    type: 'button',
                    className: 'delete-task-btn',
                    textContent: 'Delete',
                    'data-id': task.id,
                }
            );
        });
    } else {
        uiSelectors.emptyListLabel.style.display = 'block';
    }
};

const createTask = () => {
    if(validateTask(getTaskInput())) {
        saveTaskToList();
    }
    else {
        alert('The task description should contain at least 5 characters; try again.');
        return;
    }
};

uiSelectors.createTaskBtn.addEventListener('click', createTask);
uiSelectors.taskList.addEventListener('click', e => {
    const completedCheckbox = e.target.closest('.task-completed');
    const editBtn = e.target.closest('.edit-task-btn');
    const deleteBtn = e.target.closest('.delete-task-btn');

    if(completedCheckbox) {
        toggleTaskCompleted(completedCheckbox.dataset.id);
    }
    
    if(editBtn) {
        editTask(editBtn.dataset.id);
    }
    if(deleteBtn) {
        deleteTask(deleteBtn.dataset.id);
    }
});