[![CI status](https://github.com/SonnyVincenzo/SoftwareDevelopment_Project_NodeJs_SocialMedia/actions/workflows/node.js.yml/badge.svg)](https://github.com/SonnyVincenzo/SoftwareDevelopment_Project_NodeJs_SocialMedia/actions/workflows/node.js.yml)

# SoftwareDevelopment_Project_NodeJs_SocialMedia
This is a project in the software development course at Jönköping University. 
We are developing a social media website in Node.js for the backend and React for the frontend. 
We will have MySQL for the website's database. 

## The contents of the project
- The website will include the option to create an account with a username and password. 
- The users will be able to post text statuses on the website. 
- The users can rate and comment on other users posts. 
- Users will be able to add each other as friends. 
- Users can chat with each other privately. 
- The data of the users and posts will be stored in a MySQL database 

## Plan 
- Programming Language: HTML, CSS, Javascript, MySQL.
- Build System: React, Node.js, Express.
- Workflow: The group will have work separately assigned in the three sections, Frontend, Backend and the database. 

## [KanBan Board](https://github.com/users/SonnyVincenzo/projects/1)

## Requirements
Software:
1. Node.js
2. MySQL

Dependencies:
1. Express
2. Dotenv
3. MySQL2
4. Shx

### How to install & setup

#### Dependencies

##### Automatic
Write following command into a terminal where `npm --version` is able to display version:
`npm run setup`.

It installs all dependencies alongside creates a copy of `.env-sample` and renames it into `.env`, thus an automatic setup. 
**NOTE:** the current manner of copying `.env-sample` and changing name into `.env` replaces all existing content if you already have an `.env` file.

##### Manual
For dependencies: Express, Dotenv, MySQL:
Write following command into a terminal where `npm --version` is able to display version:
- Express: `npm install express`
- DotEnv: `npm install dotenv`
- MySQL: `npm install mysql2`

#### Database
Provided from the [`.env-sample`](./env-sample) we base of that the working database to be called: `social_test`, thus go into your server based MySQL terminal and write: `CREATE DATABASE social_test;`.

Once you've created your database please head into [SQL schemas](./private/db/sql/) and copy following file's content into the terminal (CTRL A + CTRL C -> [TERMINAL] CTRL + V):
- [user.sql](./private/db/sql/table.user.sql)
- [posts.sql](./private/db/sql/table.posts.sql)


### How to run the server
1. Be in the working directory: [root](./).
2. Change the name of provided file `.env-sample` to `.env`, if not already done.
3. In the terminal write: `node .`

Depending on your [`SERVER_PORT`](./.env-sample) the webapplication would display on either: `localhost:SERVER_PORT` or `127.0.0.1:SERVER_PORT`.
Recommended `SERVER_PORT` is `3000` or `8080`, port 3000 already provided in `.env-sample` file.

**Alternatively** you can install the VSCode extension "Live Server":
- Right click an html file and press Open with Live Server button.
- See the website on your browser.

This alternative offers easy support to view the website, but the **full functionailty** lies in the server provided in node.js: [index.js](./index.js) with `node .` method.

## Generating code coverage for unit tests
- Write `node --test` on your terminal.

## Participants
|Name|Github Handle|
|-|-|
|Nasra Abdirahman|nasraabdirahman|
|Jennifer Taylor|JenTay22|
|Yuze Xu|yuzekesu|
|Berkant Resyul Hasan|Berkiba|
|Josef Norling|SonnyVincenzo|
|Zaid Yassir Sultan|zySULTAN|
|Leo Jönnerstig|LJkiller|

> ## Declaration
>
> I, Berkant Hasan, declare that I am the sole author of the content I add to this repository.
>
> I, Yuze Xu, declare that I am the sole author of the content I add to this repository.
>
> I, Nasra Abdirahman, declare that I am the sole author of the content I add to this repository.
>
> I, Jennifer Taylor, declare that I am the sole author of the content I add to this repository.
>
> I, Josef Norling, declare that I am the sole author of the content I add to this repository.
>
> I, Zaid-Yassir Sultan, declare that I am the sole author of the content I add to this repository.
>
> I, Leo Jönnerstig, declare that I am the sole author of the content I add to this repository.
