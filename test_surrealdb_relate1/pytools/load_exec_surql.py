import os
import sys
from surrealdb import RecordID, Surreal
import pprint
import string

def main():
   script_name = os.path.basename(__file__)

   if len(sys.argv) != 2:
       print( "Usage: python " + script_name + " <file-path> ")
       sys.exit(1)
   
   #path = './surql/test1.surql'
   path = sys.argv[1]
   
   f = open(path)
   surql = f.read()
   #print(surql)
   
   db = Surreal("ws://localhost:8000")
   db.use("gusa", "dbtest")
   db.signin({"username": "root", "password": "root"})
   
   #print("ver",db.version())
   #result = db.query('INFO FOR DB;')
   #pprint.pprint(result)
   print("-----------------------------------------------------");
   result = db.query(surql)
   pprint.pprint(result)
   result = db.query('INFO FOR DB;')
   pprint.pprint(result)
   
   db.close();

if __name__ == "__main__":
    main()
