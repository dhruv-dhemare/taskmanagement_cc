import React, { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './App.css'

const API_BASE_URL = 'http://Task-backend-env.eba-xkse2xrh.ap-south-1.elasticbeanstalk.com'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks`)
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async (taskData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      })
      const newTask = await response.json()
      setTasks([newTask, ...tasks])
      setEditingTask(null)
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const handleUpdateTask = async (id, updates) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      const updatedTask = await response.json()
      setTasks(tasks.map(t => t._id === id ? updatedTask : t))
      setEditingTask(null)
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/api/tasks/${id}`, { method: 'DELETE' })
      setTasks(tasks.filter(t => t._id !== id))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    return task.status === filter
  })

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Task Management</h1>
          <p>Stay organized and productive</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="form-section">
            <TaskForm 
              onSubmit={editingTask ? 
                (data) => handleUpdateTask(editingTask._id, data) :
                handleAddTask
              }
              initialTask={editingTask}
              onCancel={() => setEditingTask(null)}
            />
          </div>

          <div className="tasks-section">
            <div className="filter-bar">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({tasks.length})
              </button>
              <button 
                className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                onClick={() => setFilter('pending')}
              >
                Pending ({tasks.filter(t => t.status === 'pending').length})
              </button>
              <button 
                className={`filter-btn ${filter === 'in-progress' ? 'active' : ''}`}
                onClick={() => setFilter('in-progress')}
              >
                In Progress ({tasks.filter(t => t.status === 'in-progress').length})
              </button>
              <button 
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Completed ({tasks.filter(t => t.status === 'completed').length})
              </button>
            </div>

            {loading ? (
              <div className="loading">Loading tasks...</div>
            ) : filteredTasks.length === 0 ? (
              <div className="empty-state">
                <p>No {filter !== 'all' ? filter : ''} tasks yet</p>
                <p className="empty-hint">Create a new task to get started</p>
              </div>
            ) : (
              <TaskList 
                tasks={filteredTasks}
                onUpdate={(id, updates) => handleUpdateTask(id, updates)}
                onDelete={handleDeleteTask}
                onEdit={setEditingTask}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
