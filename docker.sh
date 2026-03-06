#docker run --rm -p 8000:8000 surrealdb/surrealdb:v2.6.0 start --user root --pass root
#docker run --rm -p 8000:8000 surrealdb/surrealdb:v3.0.0 start --user root --pass root memory
docker run --rm --pull always  -p 8000:8000 surrealdb/surrealdb:latest start --user root --pass root memory
