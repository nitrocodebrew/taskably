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

const validateTask = () => getTaskInput().length >= 5;

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

        });
    }
};

const createTask = () => {
    if(validateTask()) {
        saveTaskToList();
    }
    else {
        alert('The task description should contain at least 5 characters; try again.');
        return;
    }
};

uiSelectors.createTaskBtn.addEventListener('click', createTask);