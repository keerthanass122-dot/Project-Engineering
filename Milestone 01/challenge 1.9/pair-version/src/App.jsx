import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')

  const handleAddTask = (e) => {
    e.preventDefault()
    if (input.trim() === '') return

    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    }

    setTasks([...tasks, newTask])
    setInput('')
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const remainingCount = tasks.filter((task) => !task.completed).length

  return (
    <div className="app-container">
      <header>
        <h1>Task Manager</h1>
      </header>

      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <div className="filter-buttons">
        <button
          type="button"
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          type="button"
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          type="button"
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`task-item ${task.completed ? 'completed' : ''}`}
          >
            <span>{task.text}</span>
          </li>
        ))}
      </ul>

      <footer className="task-count">
        <p>{remainingCount} tasks remaining</p>
      </footer>
    </div>
  )
}

export default App
