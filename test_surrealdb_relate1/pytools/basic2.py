import os
import sys
from surrealdb import RecordID, Surreal
import pprint
import string
import json

db = Surreal("ws://localhost:8000")
db.use("gusa", "dbtest")
db.signin({"username": "root", "password": "root"})

def pp(str):
   #pprint.pprint(str)
   pprint.pprint(str, indent = 2, width = 8)

def i(surql):
   result = db.query(surql)
   print(">> " +  surql )
   pprint.pprint(result)

def h(text):
   print("")
   print("=== " + text + "  ==============================================================")
   print("")

def table_shema():
   print("")
   print("\033[36m" + "--- TABLE INFO ---" + "\033[0m")
   db_info = db.query("INFO FOR DB;")
   #pprint.pprint(dbinfo)
   pprint.pprint(db_info['tables'])
   for key in db_info['tables']:
       #print('')
       #print(key)
       print("\033[35m" + key + "\033[0m")
       table_info = db.query("INFO FOR TABLE " + key )
       #pprint.pprint(table_info)
       pp(table_info)

def table_delete():
   print("")
   print("\033[36m" + "--- TABLE DELETE ---" + "\033[0m")
   db_info = db.query("INFO FOR DB;")
   #pprint.pprint(dbinfo)
   #pprint.pprint(db_info['tables'])
   for key in db_info['tables']:
       #print('')
       #print(key)
       print("\033[35m" + key + "\033[0m")
       table_info = db.query("REMOVE TABLE " + key )
       #pprint.pprint(table_info)

def q(surql):
   result = db.query(surql)
   print("")
   print(">> " + "\033[32m" + surql + "\033[0m")
   return result

def p(surql):
   result = db.query(surql)
   print("")
   print(">> " + "\033[32m" + surql + "\033[0m")

   #pprint.pprint(result)
   pp(result)


table_delete()

#table_shema()
print("-----------------------")

p("CREATE person:aristotle, article:on_sleep_and_sleeplessness;")
          #TABLE: REÇØRDID
p("RELATE person:aristotle->wrote->article:on_sleep_and_sleeplessness;")

#table_shema()
p("SELECT * FROM person, article;")
p("SELECT * FROM wrote;")

print("-----------------------")

q("DEFINE TABLE person2 SCHEMAFULL;")
q("DEFINE TABLE article2 SCHEMAFULL;")

p("CREATE person2:aristole")
p("CREATE article2:on_sleep_and_sleeplessness")
p("CREATE person2:AAA")
p("CREATE article2:BBB")

p("RELATE person2:aristotle->wrote2:test01->article2:on_sleep_and_sleeplessness;")
p("RELATE person2:AAA->wrote2:test02->article2:BBB;")

p("SELECT * FROM person2, article2;")
p("SELECT * FROM wrote2;")



db.close();

