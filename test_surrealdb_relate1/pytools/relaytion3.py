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

def s():
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

def array_concat(a, n):
    s = ""
    for i in range(len(a)):
        if ( i > n ) :
            s += " " + a[i]
    return s

def show_table_list():
   db_info = db.query("INFO FOR DB;")
   #pprint.pprint(dbinfo)
   #pprint.pprint(db_info['tables'])
   for key in db_info['tables']:
       print(f"{key:<15}", end = "")
       #print("\033[35m" + key + "\033[0m", end = " ")
       #print(db_info['tables'][key], end=" ")
       print( array_concat(db_info['tables'][key].split(' '), 2))

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



T = True
F = False

if F:
    h("TEST1")
    s()
    q("CREATE person:aristotle, article:on_sleep_and_sleeplessness;")
    q("RELATE person:aristotle -> wrote -> article:on_sleep_and_sleeplessness;")
    p("SELECT * FROM wrote;")

if T:
    h("BASIC")
    q("""
    CREATE person:aristotle, article:on_sleep_and_sleeplessness;
    RELATE person:aristotle->wrote->article:on_sleep_and_sleeplessness;
    """)
    
    s()
    
    p("""
    SELECT * FROM person, article;
    """)
    
    
    p("""
    SELECT * FROM wrote;
    """)
    

if T:
   show_table_list();


db.close();

