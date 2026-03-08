import os
import sys
from surrealdb import RecordID, Surreal
import pprint
import string
import json

db = Surreal("ws://localhost:8000")
db.use("gusa", "dbtest")
db.signin({"username": "root", "password": "root"})

def i(surql):
   result = db.query(surql)
   print(">> " +  surql )
   pprint.pprint(result)

def h(text):
   print("")
   print("=== " + text + "  ==============================================================")
   print("")

def table_shema():
   print("___ TABLE INFO ___")
   print("")
   db_info = db.query("INFO FOR DB;")
   #pprint.pprint(dbinfo)
   pprint.pprint(db_info['tables'])
   for key in db_info['tables']:
       print('')
       #print(key)
       print("\033[35m" + key + "\033[0m")
       table_info = db.query("INFO FOR TABLE " + key )
       pprint.pprint(table_info)
   print("_________________")
   print("")

def q(surql):
   result = db.query(surql)
   print("")
   print(">> " + "\033[33m" + surql + "\033[0m")
   return result

def p(surql):
   result = db.query(surql)
   print("")
   print(">> " + "\033[32m" + surql + "\033[0m")

   pprint.pprint(result)


table_shema()
p("SELECT name, email, age FROM users;");
p("SELECT name, content  FROM posts;");
p("SELECT *  FROM likes;");



db.close();

