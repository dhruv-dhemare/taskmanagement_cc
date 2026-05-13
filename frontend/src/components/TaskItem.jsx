import React, { useState } from 'react'
import './TaskItem.css'

function TaskItem({ task, onUpdate, onDelete, onEdit }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed'

  const priorityColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444'
  }

  const statusColors = {
    pending: '#6366f1',
    'in-progress': '#3b82f6',
    completed: '#10b981'
  }

  return (
    <div className={`task-item ${task.status} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-header">
        <div className="task-title-section">
          <input
            type="checkbox"
            checked={task.status === 'completed'}
            onChange={() => onUpdate(task._id, { status: task.status === 'completed' ? 'pending' : 'completed' })}
            className="task-checkbox"
          />
          <div className="task-info">
            <h3 className="task-title">{task.title}</h3>
            {task.dueDate && (
              <span className={`due-date ${isOverdue ? 'overdue-text' : ''}`}>
                {formatDate(task.dueDate)}
              </span>
            )}
          </div>
        </div>
        <div className="task-badges">
          <span className="priority-badge" style={{ backgroundColor: priorityColors[task.priority] }}>
            {task.priority}
          </span>
          <select
            value={task.status}
            onChange={(e) => onUpdate(task._id, { status: e.target.value })}
            className="status-select"
            style={{ borderLeftColor: statusColors[task.status] }}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {task.description && (
        <>
          <button 
            className="expand-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '▼' : '▶'} Details
          </button>
          {isExpanded && (
            <div className="task-description">
              {task.description}
            </div>
          )}
        </>
      )}

      <div className="task-footer">
        <small className="task-date">
          Created {formatDate(task.createdAt)}
        </small>
        <div className="task-actions">
          <button
            className="btn-edit"
            onClick={() => onEdit(task)}
            title="Edit task"
          >
            ✎
          </button>
          <button
            className="btn-delete"
            onClick={() => onDelete(task._id)}
            title="Delete task"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskItem
