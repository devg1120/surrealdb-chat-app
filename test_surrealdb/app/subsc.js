import { Surreal }  from 'surrealdb';
import { Table } from 'surrealdb';


// Create a new Surreal instance
const db = new Surreal();

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

const subscription = await db.live(new Table('users'));

for await (const update of subscription) {
    console.log('Update:', update.action, update.result);
}


