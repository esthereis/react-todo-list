import '../../src/App.css';
import x from './x.svg';

function Done(props) {
  return (
    <>
      <li className='doneTaskElement'>
        <input type='checkbox' onChange={() => props.onCheck()} />
        <span>{props.doneTask}</span>
        <img
          className='deleteIcon'
          src={x}
          alt='delete icon'
          onClick={() => props.onClick()}
        />
      </li>
    </>
  );
}

export default Done;
