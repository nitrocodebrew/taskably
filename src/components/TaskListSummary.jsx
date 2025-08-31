function TaskListSummary(totalListItems) {
    const properGrammar = (totalListItems) => {
        if(totalListItems === 1)
            return <p>There is currently {totalListItems} task.</p>;
        else
            return <p>There are currently {totalListItems} tasks.</p>;
    };
}

export default TaskListSummary