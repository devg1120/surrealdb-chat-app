import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Surreal, Table } from 'surrealdb';


const db = new Surreal();

await db.connect('ws://localhost:8000', {
	namespace: "gusa",
	database: "dbtest",
	authentication: {
		username: 'root',
		password: 'root'
	}
});


function  App() {

  const [count, setCount] = useState(0)
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(0);
  const [subsct, setSubsct] = useState(0);

    useEffect(() => {
        const access_db = async () => {
            const [result] = await db.query('SELECT * FROM users');
	    setUsers(result);
        };
        access_db();
    }, [update, subsct]);


  const users_ = [
    { id:1, name: "gusa", email: "devg1120@gmail.com", age:30},
    { id:2, name: "saru", email: "devg1120@gmail.com", age:20},
    { id:3, name: "memo", email: "devg1120@gmail.com", age:20},
  ];

  console.log(users);
  console.log(users_);


  const sub = async ()=> {
      const subscription = await db.live(new Table('users'));
      
      for await (const update of subscription) {
          console.log('Update:', update.action, update.result);
          setSubsct(subsct + 1);
      }
  }
  sub();

  const handleInsert = async ()=> {
    //alert('You clicked me!');
    const users = new Table('users');
    let user = await db.create(users).content({
    	name: 'AAAA',
    	email: 'aaa@example.com',
    	age: 1000
    });
    console.log(user);
    setUpdate(update + 1);
  }
  const handleGets = ()=> {
    //alert('You clicked Gets!');
    setUpdate(update + 1);
  }
  const handleDeleteAll = async ()=> {
    //alert('You clicked Gets!');
    //setUpdate(update + 1);
    //const deleted = await db.delete(new Table('users'))
    //.timeout(Duration.parse('10s'));

    const users = new Table('users');
    let user = await db.delete(users)
    setUpdate(0);
    console.log("++++++++++")
  }

  return (
    <>
    {/*
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
*/}

    <button onClick={handleInsert}>
      insert
    </button>
    <button onClick={handleGets}>
      gets
    </button>
    <button onClick={handleDeleteAll}>
      deleteAll
    </button>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid black', padding: '8px' }}>NAME</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>EMAIL</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>AGE</th>
        </tr>
      </thead>
      <tbody>
        {/* 2. .map() でデータ行を生成 */}
        {users.map((item) => (
          <tr key={item.id}>
            <td style={{ border: '1px solid black', padding: '8px' }}>{item.name}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{item.email}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{item.age}</td>
          </tr>
        ))}
      </tbody>
    </table>

    </>
  )
}

export default App
