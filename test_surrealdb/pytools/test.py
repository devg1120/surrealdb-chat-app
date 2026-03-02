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

from surrealdb import RecordID, Surreal
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

print("ver",db.version())

if True:
   result = db.query('INFO FOR DB;')
   #print(result)
   pprint.pprint(result)

if True:
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

if False:
                              # table    id
   user = db.create(RecordID("users","python"), {  # create by id
   #user = db.insert("users", {
       "name": "Python3",
       "email": "Python@example.com",
       "age": 18,
   }) 

if True:
   result = db.update(RecordID("users", 'python'), {  # update by id
       "name": "John Doe2",
       "email": "john.doe@example.com",
   })
   print("update", result)

if False:
   result = db.update(RecordID("users", 'h7mbwb7llwpoj2rp4r7h'), {
       "name": "John Doe2",
       "email": "john.doe@example.com",
   })
   print("update", result)

if False:
   result = db.query("SELECT * FROM users")
   print(">>>",result)

if False:
   query_uuid = db.live("users")

   for notification in db.subscribe_live(query_uuid):
        print(">>>",notification)
        #print(notification["action"])
        #print(notification["result"])

db.close();

