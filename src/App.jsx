import { useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskListSummary from './components/TaskListSummary'
import TaskList from './components/TaskList'

function App() {
  const [taskList, setTaskList] = useState([]);

  return (
    <>
      <TaskForm taskList={taskList} setTaskList={setTaskList} />
      <TaskListSummary totalTasks={taskList.length} />
      <TaskList taskList={taskList} />
    </>
  )
}

export default App
