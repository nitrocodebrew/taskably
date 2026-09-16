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

const validateTask = task => task.length >= 5;

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
    const newTaskDescr = prompt('Edit task description:', taskToEdit.descr);

    if(!taskToEdit || newTaskDescr === null) {
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
            const taskListItem = createHtmlElement('li', uiSelectors.taskList);

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
                }
            );
            
            editTaskBtn.addEventListener('click', () => editTask(task.id));
            deleteTaskBtn.addEventListener('click', () => deleteTask(task.id));
        });
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