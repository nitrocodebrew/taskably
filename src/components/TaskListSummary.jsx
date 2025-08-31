function TaskListSummary({ totalTasks }) {
    const properGrammar = (totalTasks) => {
        if(totalListItems === 1)
            return <p>There is currently {totalTasks} task.</p>;
        else
            return <p>There are currently {totalTasks} tasks.</p>;
    };
}

export default TaskListSummary