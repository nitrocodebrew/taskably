import { useState } from 'react'
import TaskForm from './components/TaskForm'

function App() {
  const [taskList, setTaskList] = useState([]);

  return (
    <>
      <TaskForm taskList={taskList} setTaskList={setTaskList} />
    </>
  )
}

export default App
