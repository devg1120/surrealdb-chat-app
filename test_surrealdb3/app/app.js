import { Surreal }  from 'surrealdb';
import { Table } from 'surrealdb';


// Create a new Surreal instance
const db = new Surreal();
//const info_ = await db.version();
//console.log("version:", info_.version); // "surrealdb-3.0.1"

// Connecting as system user
await db.connect('ws://localhost:8000', {
	namespace: "gusa",
	database: "dbtest",
	authentication: {
		username: 'root',
		password: 'root'
	}
});

const info = await db.version();
console.log("version:", info.version); // "surrealdb-3.0.1"


//  Defining your tables
const users = new Table('users');
const products = new Table('products');

const user = await db.create(users).content({
	name: 'John',
	email: 'john@example.com',
	age: 32
});


//console.log(user);
// Select all users
const allusers = await db.select(users);

console.log(allusers);
console.log("length:", allusers.length);
// Time functions
const now = await db.run('time::now');
console.log('Current time:', now);

db.close();

