import '../../src/App.css';

function Task(props) {
  return (
    <li className='newTask'>
      <input onChange={() => props.onCheck()} type='checkbox' />
      <span>{props.task}</span>
    </li>
  );
}

export default Task;
