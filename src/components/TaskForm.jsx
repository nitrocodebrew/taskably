import { useState, useEffect } from 'react'

function TaskForm({ taskList, setTaskList }) {
    const [input, setInput] = useState('');

    // For dev environment
    useEffect(() => console.log(taskList), [taskList]);

    const preventDefaultSubmit = e => e.preventDefault();
    const handleInputChange = e => setInput(e.target.value);
    const handleCreateTask = () => {
        const newTask = input.trim();

        // Require at least 4 characters per task label.
        if(newTask !== '' && newTask.length >= 4) {
            // Save the new task.
            setTaskList([
                ...taskList,
                {
                    id: new Date().getTime(),
                    label: newTask,
                    done: false
                }
            ]);
        }
        else {
            // TO-DO: Make this more elegant
            alert('The task label should contain at least four (4) characters; try again.');
            return;
        }
    };

    return (
        <form onSubmit={preventDefaultSubmit}>
            <input type="text" value={input} onChange={handleInputChange} />
            <input type="submit" value="Add +" onClick={handleCreateTask} />
        </form>
    );
}

export default TaskForm