
# ネームスペース作成
#DEFINE NAMESPACE gusa;
#USE NS gusa;

# データベース作成
#DEFINE DATABASE testdb;
#DEFINE USER worker ON ROOT PASSWORD "root" ROLES OWNER;

# ネームスペースとデータベースの利用を宣言
#USE NS gusa;
#USE DATABASE testdb;

# Roomテーブルの作成
DEFINE TABLE users SCHEMAFULL;

# Roomテーブルの各フィールドを作成
DEFINE FIELD id    ON TABLE users TYPE string;
DEFINE FIELD name  ON TABLE users TYPE string;
DEFINE FIELD email ON TABLE users TYPE string;
DEFINE FIELD age   ON TABLE users TYPE int;

# Roomテーブルのroom_typeフィールドのインデックスを作成
#DEFINE INDEX room_type_idx ON TABLE room FIELDS room_type;

# Roomテーブルのroom_typeフィールドの値"２"でセレクトしたMateriarizeテーブルを作成
#DEFINE TABLE type_2_room AS SELECT * FROM room WHERE room_type = 2;

#CREATE users:john SET name = 'John', email = 'joine@gmail.com' ,  age = 30;

INSERT INTO
   users (id, name, email, age)
   VALUES ('john2', 'John',  'joine@gmail.com' , 30);


