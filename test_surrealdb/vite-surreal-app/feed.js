import { Surreal }  from 'surrealdb';
//import { Table } from 'surrealdb';
import { Table, RecordId, eq } from 'surrealdb';



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

let user = await db.create(users).content({
	name: 'John',
	email: 'john@example.com',
	age: 32
});

user = await db.create(users).content({
	name: 'gusa',
	email: 'gusa@example.com',
	age: 22
});

user = await db.create(users).content({
	name: 'ntt',
	email: 'ntt@example.com',
	age: 60
});

try {
   const appleId = new RecordId(products, 'apple');
   const product = await db.create(appleId).content({
   	name: 'Apple',
   	price: 1.50,
   	category: 'fruit'
   });
} catch(e) {
   console.log("prodacts  Apple exist!!");
}
const apple = await db.select(new RecordId(products, 'apple'));

// Select specific fields with filtering
const results = await db.select(products)
	.fields('name', 'price')
	.where(eq("category", "fruit"))
	.limit(10);

//console.log(user);
// Select all users
const allusers = await db.select(users);

console.log(allusers[allusers.length-1]);
console.log("length:", allusers.length);


//const [cheapProducts] = await db.query<[{ name: string; price: number }[]]>(
const [cheapProducts] = await db.query(
	'SELECT name, price FROM products WHERE price < $max_price ORDER BY price',
	{ max_price: 5.00 }
);

console.log(cheapProducts);

// Time functions
const now = await db.run('time::now');
console.log('Current time:', now);

db.close();

