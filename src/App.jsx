// import React, { useState, useEffect } from 'react';
// import './App.css';
// import TaskForm from './components/TaskForm';
// import TaskList from './components/TaskList';
// import ErrorBoundary from './components/ErrorBoundary';

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState('all');
//   const [theme, setTheme] = useState('light');

//   useEffect(() => {
//     try {
//       const savedTasks = localStorage.getItem('tasks');
//       console.log('Raw localStorage tasks:', savedTasks);
//       if (savedTasks) {
//         const parsedTasks = JSON.parse(savedTasks);
//         console.log('Parsed localStorage tasks:', parsedTasks);
//         if (Array.isArray(parsedTasks)) {
//           const validTasks = parsedTasks.filter(
//             (task) => task && typeof task === 'object' && task.id && task.title
//           );
//           console.log('Valid tasks:', validTasks);
//           setTasks(validTasks);
//         } else {
//           console.log('localStorage tasks is not an array, resetting to []');
//           setTasks([]);
//         }
//       } else {
//         console.log('No tasks in localStorage, initializing with []');
//         setTasks([]);
//       }
//     } catch (error) {
//       console.error('Ошибка при загрузке задач из localStorage:', error);
//       setTasks([]);
//     }
//   }, []);

//   useEffect(() => {
//     try {
//       console.log('Saving tasks to localStorage:', tasks);
//       localStorage.setItem('tasks', JSON.stringify(tasks));
//     } catch (error) {
//       console.error('Ошибка при сохранении задач в localStorage:', error);
//     }
//   }, [tasks]);

//   const addTask = (task) => {
//     if (!task || typeof task !== 'object' || !task.title?.trim()) {
//       alert('Введите название задачи!');
//       return;
//     }
//     const newTask = {
//       title: task.title.trim(),
//       description: task.description ? task.description.trim() : '',
//       deadline: task.deadline || '',
//       id: Date.now(),
//       status: 'new',
//     };
//     console.log('Adding task:', newTask);
//     setTasks((prevTasks) => {
//       const updatedTasks = [...prevTasks, newTask];
//       console.log('Updated tasks:', updatedTasks);
//       return updatedTasks;
//     });
//   };

//   const deleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//   };

//   const updateTask = (updatedTask) => {
//     if (!updatedTask.title?.trim()) {
//       alert('Введите название задачи!');
//       return;
//     }
//     setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
//   };

//   const toggleStatus = (id, status) => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === id ? { ...task, status } : task
//       )
//     );
//   };

//   const toggleTheme = () => {
//     setTheme(theme === 'light' ? 'dark' : 'light');
//   };

//   const filteredTasks = Array.isArray(tasks)
//     ? tasks.filter((task) => {
//         if (filter === 'all') return true;
//         return task.status === filter;
//       })
//     : [];
//   console.log('filteredTasks:', filteredTasks);

//   return (
//     <ErrorBoundary>
//       <div className={`app ${theme}`}>
//         <div className="container">
//           <header className="header">
//             <h1 className="title">TO DO LIST</h1>
//             <button onClick={toggleTheme} className="theme-toggle">
//               {theme === 'light' ? '🌙 Тёмная' : '☀️ Светлая'}
//             </button>
//           </header>
//           <TaskForm addTask={addTask} theme={theme} />
//           <div className="filter">
//             <label className="filter-label">Фильтр:</label>
//             <select onChange={(e) => setFilter(e.target.value)} className="filter-select">
//               <option value="all">Все</option>
//               <option value="new">Новые</option>
//               <option value="in-progress">В процессе</option>
//               <option value="completed">Завершённые</option>
//             </select>
//           </div>
//           <TaskList
//             tasks={filteredTasks}
//             deleteTask={deleteTask}
//             updateTask={updateTask}
//             toggleStatus={toggleStatus}
//             theme={theme}
//           />
//         </div>
//       </div>
//     </ErrorBoundary>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  // Состояние для задач, фильтра и темы
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState('light');

  // Загружаем задачи из localStorage при загрузке приложения
  useEffect(() => {
    console.log("Пробую загрузить задачи из localStorage...");
    const savedTasks = localStorage.getItem('tasks'); // Берём данные по ключу 'tasks'
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks); // Преобразуем строку в массив
        console.log("Данные из localStorage:", parsedTasks);
        // Проверяем, что данные — это массив
        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks); // Устанавливаем задачи в состояние
          console.log("Задачи успешно загружены из localStorage!");
        } else {
          console.log("Данные в localStorage не массив, ставлю пустой массив.");
          setTasks([]);
        }
      } catch (error) {
        console.log("Ошибка при чтении из localStorage:", error);
        setTasks([]); // Если ошибка, ставим пустой массив
      }
    } else {
      console.log("В localStorage нет задач, ставлю пустой массив.");
      setTasks([]);
    }
  }, []); // Пустой массив зависимостей, чтобы сработало только при загрузке

  // Сохраняем задачи в localStorage, когда они меняются
  useEffect(() => {
    console.log("Сохраняю задачи в localStorage:", tasks);
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks)); // Преобразуем массив в строку и сохраняем
      console.log("Задачи успешно сохранены в localStorage!");
    } catch (error) {
      console.log("Ошибка при сохранении в localStorage:", error);
      alert("Не удалось сохранить задачи! Возможно, память браузера заполнена.");
    }
  }, [tasks]); // Срабатывает, когда меняется массив tasks

  // Функция для добавления новой задачи
  const addTask = (task) => {
    if (!task || !task.title || task.title.trim() === '') {
      alert("Введите название задачи!");
      return;
    }
    const newTask = {
      title: task.title.trim(),
      description: task.description ? task.description.trim() : '',
      deadline: task.deadline || '',
      id: Date.now(), // Уникальный ID на основе времени
      status: 'new', // Новый статус по умолчанию
    };
    console.log("Добавляю новую задачу:", newTask);
    setTasks([...tasks, newTask]); // Добавляем задачу в массив
  };

  // Функция для удаления задачи
  const deleteTask = (id) => {
    console.log("Удаляю задачу с ID:", id);
    setTasks(tasks.filter((task) => task.id !== id)); // Удаляем задачу по ID
  };

  // Функция для редактирования задачи
  const updateTask = (updatedTask) => {
    if (!updatedTask.title || updatedTask.title.trim() === '') {
      alert("Введите название задачи!");
      return;
    }
    console.log("Редактирую задачу:", updatedTask);
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  // Функция для изменения статуса задачи
  const toggleStatus = (id, status) => {
    console.log("Меняю статус задачи с ID:", id, "на:", status);
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status } : task)));
  };

  // Функция для смены темы
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    console.log("Тема изменена на:", theme === 'light' ? 'dark' : 'light');
  };

  // Функция для очистки всех задач
  const clearTasks = () => {
    setTasks([]); // Очищаем массив задач
    localStorage.removeItem('tasks'); // Удаляем данные из localStorage
    console.log("Все задачи очищены!");
    alert("Все задачи удалены!");
  };

  // Фильтруем задачи в зависимости от выбранного фильтра
  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter((task) => {
        if (filter === 'all') return true;
        return task.status === filter;
      })
    : [];
  console.log("Отфильтрованные задачи:", filteredTasks);

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
            <button onClick={clearTasks} className="task-button delete">
              Очистить всё
            </button>
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