import React, { useState, useEffect } from 'react'
import './TaskForm.css'

function TaskForm({ onSubmit, initialTask, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  })

  useEffect(() => {
    if (initialTask) {
      setFormData({
        title: initialTask.title,
        description: initialTask.description || '',
        priority: initialTask.priority,
        dueDate: initialTask.dueDate ? initialTask.dueDate.split('T')[0] : ''
      })
    }
  }, [initialTask])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      alert('Title is required')
      return
    }
    onSubmit(formData)
    setFormData({ title: '', description: '', priority: 'medium', dueDate: '' })
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{initialTask ? 'Edit Task' : 'Create New Task'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Task Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="What needs to be done?"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add more details..."
          className="form-textarea"
          rows="3"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="form-select"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {initialTask ? 'Update Task' : 'Create Task'}
        </button>
        {initialTask && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default TaskForm
