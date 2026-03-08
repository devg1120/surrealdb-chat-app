import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Surreal, Table , RecordId} from 'surrealdb';

/*
https://surrealdb.com/docs/2.x/sdk/javascript/api/queries/relate-promise
*/
const db = new Surreal();

await db.connect('ws://localhost:8000', {
	namespace: "gusa",
	database: "dbtest",
	authentication: {
		username: 'root',
		password: 'root'
	}
});
/*
await db.query(`
  DEFINE TABLE IF NOT EXISTS messages SCHEMAFULL;
  DEFINE FIELD IF NOT EXISTS username ON messages TYPE string ASSERT $value != NONE;
  DEFINE FIELD IF NOT EXISTS message ON messages TYPE string ASSERT $value != NONE;
  DEFINE FIELD IF NOT EXISTS timestamp ON messages TYPE datetime DEFAULT time::now();
  DEFINE INDEX IF NOT EXISTS messages_timestamp_idx ON messages COLUMNS timestamp;
`);
console.log('✅ Messages table schema initialized successfully');
*/

await db.query(`
  DEFINE TABLE IF NOT EXISTS users SCHEMAFULL;
  DEFINE FIELD IF NOT EXISTS name  ON users TYPE string ASSERT $value != NONE;
  DEFINE FIELD IF NOT EXISTS email ON users TYPE string ASSERT $value != NONE;
  DEFINE FIELD IF NOT EXISTS age   ON users TYPE number   ASSERT $value != NONE;

  DEFINE TABLE IF NOT EXISTS posts SCHEMAFULL;
  DEFINE FIELD IF NOT EXISTS content  ON posts TYPE string ASSERT $value != NONE;
  DEFINE FIELD IF NOT EXISTS name     ON posts TYPE string ASSERT $value != NONE;
`);

console.log('✅ Messages table schema initialized successfully');
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

  //console.log(users);
  //console.log(users_);


  const sub = async ()=> {
      const subscription = await db.live(new Table('users'));
      
      for await (const update of subscription) {
          console.log('Update:', update.action, update.result);
          setSubsct(subsct + 1);
      }
  }
  sub();

  const table_fields_dump = ( table_info ) => {
     console.log(table_info)
     for ( let k in  table_info[0].fields) {
        //console.log(table_info[0].fields[k]);
        let fields_name = table_info[0].fields[k].split(' ')[2];
        let fields_type = table_info[0].fields[k].split(' ')[6];
	console.log("   -", fields_name, fields_type)
     }


  }
  const db_tables_dump = async ( db_info ) => {
     console.log(db_info)
     for ( let k in  db_info[0].tables) {
        //console.log(db_[0].tables[k])
        let table_name = db_info[0].tables[k].split(' ')[2];
	console.log(table_name)
        const query = 'INFO FOR TABLE ' + table_name  + ' ;' 
	//console.log(query)
        const table_info = await db.query(query)
        table_fields_dump( table_info )
     }
  }

  const handleDump = async ()=> {
     //console.log(await db.query(` INFO FOR ROOT;`) );
     //console.log(await db.query(` INFO FOR NS;`) );
     //console.log(await db.query(` INFO FOR DB;`) );
     
     const db_info = await db.query(` INFO FOR DB;`) ;
     db_tables_dump( db_info );

  }


  const handleCreate = async ()=> {
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

  const handleInsert = async ()=> {
     const users = await db.insert([
       { id: new RecordId('users', 'bob'), name: 'Bob' , email: 'bob@gmail.com', age:10},
       { id: new RecordId('users', 'carol'), name: 'Carol'  ,email: ' carol@gmail.com',age: 11}
]);
     setUpdate(update + 1);
  }

  const handleUpdate = async ()=> {

     const user = await db.update(new RecordId('users', 'bob'))
      .content({ name: 'John Smith', email: 'john@example.com' , age: 99});

     setUpdate(update + 1);
  }

  const handleMerge = async ()=> {
     const user = await db.update(new RecordId('users', 'bob'))
      .merge({ age: 100});
     setUpdate(update + 1);
  }

  const handleDelete = async ()=> {
     const user = await db.delete(new RecordId('users', 'bob'));
     setUpdate(update + 1);
  }
  const handleGets = ()=> {
    //alert('You clicked Gets!');
    setUpdate(update + 1);
  }

  const handleDeleteAll = async ()=> {
    const users = new Table('users');
    let user = await db.delete(users)
    const posts = new Table('posts');
    await db.delete(posts)
    setUpdate(0);
    console.log("++++++++++")
  }

  const handlePost = async ()=> {
     const users = await db.insert([
       { id: new RecordId('posts', '1'), name: 'Bob' , content: 'content............'},
      ])
      const edge = await db.relate(
        new RecordId('users', 'bob'),
        new Table('likes'),
        new RecordId('posts', '1')
      ).unique();
      console.log("edge", edge);
  }

  const handlePost2 = async ()=> {
     const users = await db.insert([
       { id: new RecordId('posts', '2'), name: 'Bob' , content: 'content............2'},
      ])
     const edge = await db.query(`
     RELATE users:bob->likes->posts:1
         SET 
     		metadata.time_written = time::now(),
     		metadata.location = "Tallinn";
     `);
      console.log("edge", edge);

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
<div>
    <button onClick={handleCreate}>
      create
    </button>
    <button onClick={handleInsert}>
     insert 
    </button>
    <button onClick={handleUpdate}>
     update
    </button>
    <button onClick={handleMerge}>
      merge
    </button>
    <button onClick={handleGets}>
      gets
    </button>
    <button onClick={handleDelete}>
      delete
    </button>
    <button onClick={handleDeleteAll}>
      deleteAll
    </button>
</div>
<div>
    <button onClick={handlePost}>
      post1
    </button>
    <button onClick={handlePost2}>
      post2
    </button>
    <button onClick={handleDump}>
      dump
    </button>
</div>

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
          <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>NAME</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>EMAIL</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>AGE</th>
        </tr>
      </thead>
      <tbody>
        {/* 2. .map() でデータ行を生成 */}
        {users.map((item) => (
          <tr key={item.id}>
            <td style={{ border: '1px solid black', padding: '8px' }}>{String(item.id)}</td>
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
