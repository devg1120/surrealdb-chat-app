"""
import asyncio
from surrealdb import WebsocketClient
from pprint import pprint as pp

_URL = "ws://127.0.0.1:8000/rpc"
_NAMESPACE = "gusa"
_DATABASE = "testdb"
_USER = "root"
_PASS = "root"

async def main():
    async with WebsocketClient( url=_URL,
        namespace=_NAMESPACE, database=_DATABASE,
        username=_USER, password=_PASS,
    ) as session:
        while True:
            sql = input('SQL> ')
            if sql.upper() == 'Q': break
            res = await session.query(sql)
            pp(res)
"""

from surrealdb import Surreal
import pprint

#db = Surreal("ws://localhost:8000")
#db.connect()
#db.use("gusa", "testdb")
#db.signin({"username": "root", "password": "root"})

"""
db = Surreal()
#db.connect()
db.connect('ws://localhost:8000', {
	namespace: "gusa",
	database: "dbtest",
	authentication: {
		username: 'root',
		password: 'root'
	}
});
"""

db = Surreal("ws://localhost:8000")
db.use("gusa", "dbtest")
db.signin({"username": "root", "password": "root"})

if True:
   result = db.query('INFO FOR DB;')
   #print(result)
   pprint.pprint(result)

if False:
   users = db.select("users")
   #print(users)
   pprint.pprint(users)


if False:
   user = db.create("users", {
   #user = db.insert("users", {
       "name": "Python",
       "email": "Python@example.com",
       "age": 18,
   })

