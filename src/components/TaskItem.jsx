import React, { useState } from 'react';

function TaskItem({ task, deleteTask, updateTask, toggleStatus, theme }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSave = () => {
    if (!editedTask.title.trim()) {
      alert('Введите название задачи!');
      return;
    }
    updateTask(editedTask);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className="form-input"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="form-textarea"
            rows="3"
          />
          <input
            type="date"
            name="deadline"
            value={editedTask.deadline}
            onChange={handleChange}
            className="form-input"
          />
          <div className="edit-buttons">
            <button onClick={handleSave} className="edit-button save">
              Сохранить
            </button>
            <button onClick={() => setIsEditing(false)} className="edit-button cancel">
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="task-item-header" onClick={handleToggle}>
            <h3 className="task-title">{task.title}</h3>
            <span className={`task-arrow ${isOpen ? 'open' : ''}`}>▼</span>
          </div>
          <div className={`task-details ${isOpen ? 'open' : ''}`}>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            {task.deadline && (
              <p className="task-deadline">Срок: {task.deadline}</p>
            )}
            <div className="task-status">
              <select
                value={task.status}
                onChange={(e) => toggleStatus(task.id, e.target.value)}
                className="status-select"
              >
                <option value="new">Новые</option>
                <option value="in-progress">В процессе</option>
                <option value="completed">Завершённые</option>
              </select>
            </div>
            <div className="task-buttons">
              <button onClick={() => setIsEditing(true)} className="task-button edit">
                Редактировать
              </button>
              <button onClick={() => deleteTask(task.id)} className="task-button delete">
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem;