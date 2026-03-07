import os
import sys
from surrealdb import RecordID, Surreal
import pprint
import string

def query(db, surql):
   result = db.query(surql)
   return result


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

def main():
   db = Surreal("ws://localhost:8000")
   db.use("gusa", "dbtest")
   db.signin({"username": "root", "password": "root"})
   

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
   result = query(db, ql_21); 
   print("")
   result = query(db, ql_22); pprint.pprint(result)
   print("")
   result = query(db, ql_23); pprint.pprint(result)

   #result = query(db, 'INFO FOR DB;')
   #pprint.pprint(result)


   db.close();

if __name__ == "__main__":
    main()
