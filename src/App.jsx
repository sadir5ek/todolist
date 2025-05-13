import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem('tasks'));
      console.log('localStorage tasks:', savedTasks);
      if (Array.isArray(savedTasks)) {
        const validTasks = savedTasks.filter(
          (task) => task && typeof task === 'object' && task.id && task.title
        );
        setTasks(validTasks);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error('Ошибка при загрузке задач из localStorage:', error);
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    if (!task || typeof task !== 'object' || !task.title?.trim()) {
      alert('Введите название задачи!');
      return;
    }
    const newTask = {
      title: task.title.trim(),
      description: task.description ? task.description.trim() : '',
      deadline: task.deadline || '',
      id: Date.now(),
      status: 'new',
    };
    console.log('Adding task:', newTask);
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      console.log('Updated tasks:', updatedTasks);
      return updatedTasks;
    });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (updatedTask) => {
    if (!updatedTask.title?.trim()) {
      alert('Введите название задачи!');
      return;
    }
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const toggleStatus = (id, status) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter((task) => {
        if (filter === 'all') return true;
        return task.status === filter;
      })
    : [];
  console.log('filteredTasks:', filteredTasks);

  return (
    <ErrorBoundary>
      <div className={`app ${theme}`}>
        <div className="container">
          <header className="header">
            <h1 className="title">Мои задачи</h1>
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? '🌙 Тёмная' : '☀️ Светлая'}
            </button>
          </header>
          <TaskForm addTask={addTask} theme={theme} />
          <div className="filter">
            <label className="filter-label">Фильтр:</label>
            <select onChange={(e) => setFilter(e.target.value)} className="filter-select">
              <option value="all">Все</option>
              <option value="new">Новые</option>
              <option value="in-progress">В процессе</option>
              <option value="completed">Завершённые</option>
            </select>
          </div>
          <TaskList
            tasks={filteredTasks}
            deleteTask={deleteTask}
            updateTask={updateTask}
            toggleStatus={toggleStatus}
            theme={theme}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;