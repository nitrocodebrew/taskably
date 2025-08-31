import { useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskListSummary from './components/TaskListSummary';

function App() {
  const [taskList, setTaskList] = useState([]);

  return (
    <>
      <TaskForm taskList={taskList} setTaskList={setTaskList} />
      <TaskListSummary totalTasks={taskList.length} />
    </>
  )
}

export default App
