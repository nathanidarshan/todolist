import './App.css';
import { useState } from 'react';

function App() {

  let [task, setTask] = useState("");
  let [todo, setTodo] = useState([]);
  let [edit, setEdit] = useState(null);
  let [search, setSearch] = useState("");
  let [final, setFinal] = useState([]);
  let [searchInfor, setSearchinfo] = useState([])

  let add = () => {
    if (edit !== null) {
      const updated = [...todo];
      setSearchinfo([...todo])

      updated[edit] = { task: task, checked: false };
      setTodo(updated);
      setFinal(updated);
      setEdit(null);
      setTask("");
    }
    else {
      setTodo([...todo, { task: task, checked: false }]);
      setSearchinfo([...todo])
      setFinal([...todo, { task: task, checked: false }]);
      setTask("");
    }
  }

  let del = (index) => {
    console.log("index = " + index)
    let d = todo.filter((val, id) => {
      console.log("id =", id)
      return id !== index;
    })
    setTodo(d);
    setFinal(d);
  }

  let update = (index) => {
    setEdit(index);
    setTask(todo[index].task);
  };

  let handlecheck = (index) => {
    const check = [...todo];
    check[index].checked = !check[index].checked;
    setTodo(check);
  }

  let searchhanlder = () => {

    let info = final.filter((val, id) => {
      return val.task === search;
    })
    console.log('info', info)
    setTodo(info);
  }

  let completed = () => {
    let com = final.filter((val, id) => {
      return val.checked === true ? val : false
    });

    setTodo(com);

    // setFinal(com);
  }

  let uncompleted = () => {
    let uncom = final.filter((val, id) => {
      return val.checked === false ? val : false
    });
    setTodo(uncom);
    // setFinal(uncom);
  }

  let all = () => {
    var data = [...final];
    setTodo(data);
  }

  return (
    <div className="App">
      <table border={1}>
        <tr>
          <td><input type="text" className='input' value={task} placeholder='Enter Task' onChange={(e) => { setTask(e.target.value) }} />
            <input type='button' className='btn' value={"Add Task"} onClick={() => { add() }} /></td>
        </tr>
        <tr>
          <td><input type='text' className='input' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
            <input type='button' className='btn' value={"Search"} onClick={() => { searchhanlder() }} /></td>
        </tr>
        <input type='button' className='btn' value={"Completed"} onClick={() => { completed() }} />
        <input type='button' className='btn' value={"UnCompleted"} onClick={() => { uncompleted() }} />
        <input type='button' className='btn' value={"All"} onClick={() => { all() }} />
      </table>

      <ul>
        {
          todo.map((ele, index) => {
            return (
              <li className='' key={index}>
                <input type='checkbox' checked={ele.checked} onChange={() => handlecheck(index)} />
                <span style={{ textDecoration: ele.checked ? "line-through" : "" }}>{ele.task}</span>
                <input type='button' value={"Delete"} className='del' onClick={() => { del(index) }} />
                <input type='button' value={"Edit"} onClick={() => { update(index) }} />

              </li>
            )
          })
        }
      </ul>
    </div >

  );
}

export default App;

