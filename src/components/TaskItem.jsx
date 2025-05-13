import React, { useState } from 'react';

function TaskItem({ task, deleteTask, updateTask, toggleStatus, theme }) {
  if (!task) {
    return null;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description || '');
  const [deadline, setDeadline] = useState(task.deadline || '');

  const handleUpdate = () => {
    if (!title.trim()) {
      alert('Введите название задачи!');
      return;
    }
    updateTask({ ...task, title: title.trim(), description: description.trim(), deadline });
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="Название задачи"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
            rows="4"
            placeholder="Описание задачи"
          />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="form-input"
          />
          <div className="edit-buttons">
            <button onClick={handleUpdate} className="edit-button save">
              Сохранить
            </button>
            <button onClick={() => setIsEditing(false)} className="edit-button cancel">
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="task-title">{task.title || 'Без названия'}</h3>
          <p className="task-description">{task.description || 'Описание не указано'}</p>
          <p className="task-deadline">Срок: {task.deadline || 'Не указан'}</p>
          <div className="task-status">
            <select
              value={task.status || 'new'}
              onChange={(e) => toggleStatus(task.id, e.target.value)}
              className="status-select"
            >
              <option value="new">Новая</option>
              <option value="in-progress">В процессе</option>
              <option value="completed">Завершена</option>
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
      )}
    </div>
  );
}

export default TaskItem;