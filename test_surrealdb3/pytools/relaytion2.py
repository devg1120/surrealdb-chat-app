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


ql0 = 'INFO FOR DB;'

ql_11 = """
DEFINE TABLE armor SCHEMAFULL;
DEFINE FIELD resistance ON armor TYPE int;

DEFINE TABLE player SCHEMAFULL;
DEFINE FIELD strength ON player TYPE int;
DEFINE FIELD armor ON player TYPE option<record<armor>>;

CREATE armor:leather SET resistance = 3;
CREATE armor:chainmail SET resistance = 20;
CREATE armor:platemail SET resistance = 30;

CREATE player:jack SET strength = 22, armor = armor:platemail;
CREATE player:brian SET strength = 20, armor = armor:leather;

RELATE player:jack -> wants_to_buy -> armor:dragon;
RELATE player:jack -> wants_to_buy -> armor:platemail;
"""

ql_12 = """
SELECT * FROM player FETCH armor;
"""

ql_13 = """
SELECT * FROM wants_to_buy;
"""
ql_14 = """
SELECT id, -> wants_to_buy -> armor AS wtb FROM player;
"""
ql_15 = """
SELECT id, <- wants_to_buy <- player AS players FROM armor:dragon
"""

# https://surrealdb.com/docs/surrealql/statements/relate

ql_21 = """
CREATE person:aristotle, article:on_sleep_and_sleeplessness;
"""
ql_22 = """
RELATE person:aristotle->wrote->article:on_sleep_and_sleeplessness;
"""

ql_23 = """
SELECT * FROM wrote;
"""

 
"""
query(db, ql_11)
print("")
print("リレーション-------------------")
print("")
result = query(db, ql_12); pprint.pprint(result)
print("")
print("グラフコネクション-------------------")
print("")
result = query(db, ql_13); pprint.pprint(result)
print("")
result = query(db, ql_14); pprint.pprint(result)
print("")
result = query(db, ql_15); pprint.pprint(result)
print("")
"""
"""
result = query(db, ql_21); 
print("")
result = query(db, ql_22); pprint.pprint(result)
print("")
result = query(db, ql_23); pprint.pprint(result)
"""

T = True
F = False

if F:
    h("TEST1")
    s()
    q("CREATE person:aristotle, article:on_sleep_and_sleeplessness;")
    q("RELATE person:aristotle -> wrote -> article:on_sleep_and_sleeplessness;")
    p("SELECT * FROM wrote;")

if T:
    h("TEST2")
    q("""
    DEFINE TABLE armor SCHEMAFULL;
    DEFINE FIELD resistance ON armor TYPE int;
    
    DEFINE TABLE player SCHEMAFULL;
    DEFINE FIELD strength ON player TYPE int;
    DEFINE FIELD armor ON player TYPE option<record<armor>>;
    
    CREATE armor:leather SET resistance = 3;
    CREATE armor:chainmail SET resistance = 20;
    CREATE armor:platemail SET resistance = 30;
    
    CREATE player:jack SET strength = 22, armor = armor:platemail;
    CREATE player:brian SET strength = 20, armor = armor:leather;
    
    RELATE player:jack -> wants_to_buy -> armor:dragon;
    RELATE player:jack -> wants_to_buy -> armor:platemail;
    """)
    
    s()
    
    p("""
    SELECT * FROM player FETCH armor;
    """)
    
    p("""
    SELECT * FROM wants_to_buy;
    """)
    
    
    p("""
    SELECT id, -> wants_to_buy -> armor AS wtb FROM player;
    """)
    
    p("""
    SELECT id, <- wants_to_buy <- player AS players FROM armor:dragon
    """)




db.close();

