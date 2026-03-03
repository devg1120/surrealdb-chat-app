#DEFINE NAMESPACE gusa;
#USE NS gusa;

#DEFINE DATABASE testdb;
#DEFINE USER worker ON ROOT PASSWORD "root" ROLES OWNER;

#USE NS gusa;
#USE DATABASE testdb;


DEFINE TABLE users SCHEMAFULL;

DEFINE FIELD id    ON TABLE users TYPE string;
DEFINE FIELD name  ON TABLE users TYPE string;
DEFINE FIELD email ON TABLE users TYPE string;
DEFINE FIELD age   ON TABLE users TYPE int;


INSERT INTO
   users (id, name, email, age)
   VALUES ('john', 'John',  'joine@gmail.com' , 30);

CREATE users CONTENT
       { id: 'john2', name: 'John2', email: 'john2@gmail.com ', age: 99 };


CREATE users SET
       id = users:john3 , name= "J3", email= "---", age=30;

