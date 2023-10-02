import { useEffect, useState } from 'react';

import './App.css';
import Task from './components/Task';
import Done from './components/Done';

function App() {
  const initialList = JSON.parse(window.localStorage.getItem('list'));
  const initialDoneList = JSON.parse(window.localStorage.getItem('doneList'));

  const [newTask, setNewTask] = useState('');
  const [list, setList] = useState(() => initialList ?? []);
  const [doneList, setDoneList] = useState(() => initialDoneList ?? []);

  useEffect(() => {
    window.localStorage.setItem('list', JSON.stringify(list));
    window.localStorage.setItem('doneList', JSON.stringify(doneList));
  }, [list, doneList]);

  function addNewTask(e) {
    e.preventDefault();
    setList([newTask, ...list]);
    setNewTask('');
  }

  function removeTask(index, list, setState) {
    const filteredList = list.filter((value, i) => {
      return index !== i;
    });
    setState(filteredList);
  }

  function addDoneTask(item) {
    setDoneList([item, ...doneList]);
  }

  return (
    <>
      <div className='todoTasksContainer'>
        <h1>Todo List</h1>

        <form className='inputElement'>
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
                addDoneTask(item), removeTask(i, list, setList);
              }}
            ></Task>
          ))}
        </ul>

        <div className='doneTasksContainer'>
          {doneList.length > 0 && <hr className='solid' />}
          {doneList.map((item, i) => (
            <Done
              key={`doneTask${item}${i}`}
              doneTask={item}
              onCheck={() => {
                setList([...list, item]), removeTask(i, doneList, setDoneList);
              }}
              onClick={() => {
                removeTask(i, doneList, setDoneList);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
