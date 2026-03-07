# Learning SurrealDB

A repository for holding the surreal queries used in the learning process of SurrealDB. You can watch the livestreams [on my YouTube playlist](https://www.youtube.com/playlist?list=PL5AVzKSngnt_xPGNuYdrbB7NZtJbQ046ai).

Each stream has its own folder with the queries used in the livestream.

## Stream 1 - Learning the basics

In the first stream, we learn the basics of defining tables and fields, went over various data types and learned to query them.

[Watch the livestream](https://youtube.com/live/R6XUS8aLLhQ?feature=share)

## Stream 2 - Learning relations

In the seconds stream, we learn about the graph relations.

[Watch the livestream](https://youtube.com/live/RLFR6Bl2I2M?feature=share)

## Stream 3 - Designing schema

In the third stream, we designed a schema for [my blog](https://xkonti.tech).

[Watch the livestream](https://youtube.com/live/Jb18brBK660?feature=share)

The finished schema diagram:
![Finished schema diagram](/stream_3/surrealdb_stream_3_diagram.png)

## Stream 4 - Authentication via JWTs from Clerk

In the fourth stream, we learn how to authenticate users using third-party authentication providers like Clerk. We also learn how to automatically create user record when the user is authenticated for the first time and keep it up to date afterwards.

[Watch the livestream](https://youtube.com/live/L6J5v5ypZRg?feature=share)

## Stream 5 - Permissions deep dive

The fifth stream focuses on the permissions system in SurrealDB. We learn how to use the `PERMISSIONS` clause and discover it's limitations. We also discover how events allow us to perform actions with elevated privileges. This led us to implementing automatic counting of likes and comments and ensuring complex requirements of comment approvals.

[Watch the livestream](https://youtube.com/live/Nyx2PXOGQmU?feature=share)

## Stream 6 - Permissions - continued

During this stream, we continue to explore the permissions system. We implement a view table that allows us to expose only partial post data to the users while increasing the performance of various queries.

[Watch the livestream](https://youtube.com/live/3yO4iSBApvI?feature=share)

## Stream 7 - Update to 2.0.0-beta.1 and test data generation

This stream covers the updates introduced in the 2.0.0-beta.1 release of SurrealDB. We explore some of the new features by updating and completing the existing schema. Then we move on to writing queries that generate tons of test data and connect it all together. We finish the stream by completing the "permissions" adventures.

[Watch the livestream](https://youtube.com/live/WB6CgWI4OOg?feature=share)

## Stream 8 - Sending content to the Database from Astro

⚠️ This is an upcoming livestream.

We will learn how design a set of functions that allow us to send content from the Astro build process to the database. Database will then automatically update the necessary content and remove the outdated parts.

[Watch the livestream](https://youtube.com/live/46iKEYmRB50?feature=share)