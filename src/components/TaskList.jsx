function TaskList({ taskList }) {
    return (
        <ul>
            {taskList.map((task) => {
                return <li key={task.id}><h3>{task.label}</h3></li>
            })}
        </ul>
    )
}

export default TaskList