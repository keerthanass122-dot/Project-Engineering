import React, { useState } from 'react'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [filter, setFilter] = useState('all')

  const handleAddTask = (e) => {
    e.preventDefault()
    const trimmedTitle = newTaskTitle.trim()
    if (!trimmedTitle) return

    const newTask = {
      id: Date.now(),
      title: trimmedTitle,
      completed: false,
    }

    setTasks((prevTasks) => [...prevTasks, newTask])
    setNewTaskTitle('')
  }

  const handleToggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
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
      <div className="task-card">
        <header className="header">
          <h1>Task Manager</h1>
        </header>

        <form className="task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            className="task-input"
            placeholder="Add a new task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button type="submit" className="add-btn">
            Add
          </button>
        </form>

        <div className="filter-group">
          <button
            type="button"
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        <ul className="task-list">
          {filteredTasks.length === 0 ? (
            <li className="empty-message">No tasks found</li>
          ) : (
            filteredTasks.map((task) => (
              <li
                key={task.id}
                className={`task-item ${task.completed ? 'completed' : ''}`}
                onClick={() => handleToggleTask(task.id)}
              >
                <span className="task-checkbox" aria-hidden="true">
                  {task.completed ? '✓' : ''}
                </span>
                <span className="task-text">{task.title}</span>
              </li>
            ))
          )}
        </ul>

        <footer className="footer">
          <p className="task-count">{remainingCount} tasks remaining</p>
        </footer>
      </div>
    </div>
  )
}

export default App
