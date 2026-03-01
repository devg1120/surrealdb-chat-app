import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Surreal } from 'surrealdb';


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

    useEffect(() => {
        const access_db = async () => {
            const [result] = await db.query('SELECT * FROM users');
	    setUsers(result);
        };
        access_db();
    }, []);


  const users_ = [
    { id:1, name: "gusa", email: "devg1120@gmail.com", age:30},
    { id:2, name: "saru", email: "devg1120@gmail.com", age:20},
    { id:3, name: "memo", email: "devg1120@gmail.com", age:20},
  ];

  console.log(users);
  console.log(users_);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
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
