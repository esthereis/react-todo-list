import { useEffect, useState } from 'react';

import './App.css';
import Task from './components/Task';

function App() {
  const initialList = window.localStorage.getItem('list').split(',');

  const [newTask, setNewTask] = useState('');
  const [list, setList] = useState(initialList);

  useEffect(() => window.localStorage.setItem('list', [list]));

  function addNewTask(e) {
    e.preventDefault();
    setList([newTask, ...list]);
    setNewTask('');
  }

  function removeTask(index) {
    const filteredList = list.filter((value, i) => {
      return index !== i;
    });
    setList(filteredList);
  }

  return (
    <>
      <div className='container'>
        <h1>Todo List</h1>

        <form className='addItem'>
          <input
            value={newTask}
            className='inputTask'
            type='text'
            placeholder='Add your task'
            onChange={e => setNewTask(e.target.value)}
          />
          <button onClick={addNewTask} className='addButton'>
            Add
          </button>
        </form>

        <ul>
          {list.map((item, i) => (
            <Task
              key={`task-${item}${i}`}
              task={item}
              onCheck={() => {
                removeTask(i);
              }}
            ></Task>
          ))}
        </ul>

        <div>
          <hr className='solid hidden' />
        </div>
      </div>
    </>
  );
}

export default App;
