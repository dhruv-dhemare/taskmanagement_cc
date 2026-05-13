import React from 'react'
import TaskItem from './TaskItem'
import './TaskList.css'

function TaskList({ tasks, onUpdate, onDelete, onEdit }) {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}

export default TaskList
