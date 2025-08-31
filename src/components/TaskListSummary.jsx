function TaskListSummary({ totalTasks }) {
    const properGrammar = (totalTasks) => {
        if(totalTasks === 1)
            return <p>There is currently {totalTasks} task.</p>;
        else
            return <p>There are currently {totalTasks} tasks.</p>;
    };
    return (
        <>
            {properGrammar(totalTasks)}
        </>
    )
}

export default TaskListSummary