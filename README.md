# creating a basic TypeORM project with migrations

Based on TypeORM Docs - and quickly expanding from there:
 * [TypeORM's Quick Start](https://typeorm.io/docs/getting-started/#quick-start) 
 * [Example using TypeORM with Express](https://typeorm.io/docs/guides/example-with-express)

## Preconditions

 * npm, NodeJS, TypeScript etc. installed
 * MySQL is available and running on port 3306
 * an application (DB) user `test` is granted access to a `test` database with CRUD privileges etc.

### npm, NodeJS and TypeScript is installed

**NB** This is important because migration uses typeorm-cli - which might work with different environment settings than executing `npm run` commands.

#### Node Package Manager
<code style="color : greenyellow">➜</code> <code style="color : aqua">dev</code> ```npm -v ```

```
10.9.2
```

#### Node Package Runner
<code style="color : greenyellow">➜</code> <code style="color : aqua">dev</code> ```npx -v ```

```
10.9.2
```

#### NodeJS
<code style="color : greenyellow">➜</code> <code style="color : aqua">dev</code> ```node -v ```
```
v22.15.0
```

<code style="color : greenyellow">➜</code> <code style="color : aqua">dev</code> ```which node ```

```
/home/jlm/.nvm/versions/node/v22.15.0/bin/node
```

<code style="color : greenyellow">➜</code> <code style="color : aqua">dev</code> ```ls -la /home/jlm/.nvm/versions/node/v22.15.0/bin ```

```
total 118396
lrwxrwxrwx 1 jlm jlm        45 Apr 22 22:58 corepack -> ../lib/node_modules/corepack/dist/corepack.js
-rwxr-xr-x 1 jlm jlm 121236344 Apr 22 22:58 node
lrwxrwxrwx 1 jlm jlm        38 Apr 22 22:58 npm -> ../lib/node_modules/npm/bin/npm-cli.js
lrwxrwxrwx 1 jlm jlm        38 Apr 22 22:58 npx -> ../lib/node_modules/npm/bin/npx-cli.js
lrwxrwxrwx 1 jlm jlm        41 Jun 23 20:28 react-devtools -> ../lib/node_modules/react-devtools/bin.js
```
**Notice** `tsc` and `ts-node` not avilable here yet - which is confirmed by this:

<code style="color : greenyellow">➜</code> <code style="color : aqua">dev</code> ```tsc -v ```

```
zsh: command not found: tsc
```

<code style="color : greenyellow">➜</code> <code style="color : aqua">dev</code> ```npm install -g typescript ts-node ```

```
added 20 packages in 3s
```

<code style="color : greenyellow">➜</code> <code style="color : aqua">dev</code> ```tsc -v ```

```
Version 5.8.3
```

<code style="color : greenyellow">➜</code> <code style="color : aqua">dev</code> ```ts-node -v ```

```
v10.9.2
```

<code style="color : greenyellow">➜</code> <code style="color : aqua">dev</code> ```which tsc ```

```
/home/jlm/.nvm/versions/node/v22.15.0/bin/tsc
```

<code style="color : greenyellow">➜</code> <code style="color : aqua">dev</code> ```ls -l /home/jlm/.nvm/versions/node/v22.15.0/bin/ ```

```
total 118396
lrwxrwxrwx 1 jlm jlm        45 Apr 22 22:58 corepack -> ../lib/node_modules/corepack/dist/corepack.js
-rwxr-xr-x 1 jlm jlm 121236344 Apr 22 22:58 node
lrwxrwxrwx 1 jlm jlm        38 Apr 22 22:58 npm -> ../lib/node_modules/npm/bin/npm-cli.js
lrwxrwxrwx 1 jlm jlm        38 Apr 22 22:58 npx -> ../lib/node_modules/npm/bin/npx-cli.js
lrwxrwxrwx 1 jlm jlm        41 Jun 23 20:28 react-devtools -> ../lib/node_modules/react-devtools/bin.js
lrwxrwxrwx 1 jlm jlm        38 Jul  7 13:17 tsc -> ../lib/node_modules/typescript/bin/tsc
lrwxrwxrwx 1 jlm jlm        39 Jul  7 13:17 ts-node -> ../lib/node_modules/ts-node/dist/bin.js
lrwxrwxrwx 1 jlm jlm        43 Jul  7 13:17 ts-node-cwd -> ../lib/node_modules/ts-node/dist/bin-cwd.js
lrwxrwxrwx 1 jlm jlm        43 Jul  7 13:17 ts-node-esm -> ../lib/node_modules/ts-node/dist/bin-esm.js
lrwxrwxrwx 1 jlm jlm        46 Jul  7 13:17 ts-node-script -> ../lib/node_modules/ts-node/dist/bin-script.js
lrwxrwxrwx 1 jlm jlm        49 Jul  7 13:17 ts-node-transpile-only -> ../lib/node_modules/ts-node/dist/bin-transpile.js
lrwxrwxrwx 1 jlm jlm        57 Jul  7 13:17 ts-script -> ../lib/node_modules/ts-node/dist/bin-script-deprecated.js
lrwxrwxrwx 1 jlm jlm        43 Jul  7 13:17 tsserver -> ../lib/node_modules/typescript/bin/tsserver
```


### MySQL is available (port 3306) and user `test` is granted access to DB `test`

<code style="color : greenyellow">➜</code> <code style="color : aqua">dev</code> ```docker exec -it sandbox mysql -u test -p```

```
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 3127
Server version: 8.0.32 MySQL Community Server - GPL

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> use test;
Database changed
mysql> 
```

## 1. First step - create the app

<code style="color : greenyellow">➜</code> <code style="color : aqua">dev</code> ```npx typeorm -v ```

```
Need to install the following packages:
typeorm@0.3.25
Ok to proceed? (y) y

0.3.25
```

<code style="color : greenyellow">➜</code> <code style="color : aqua">dev</code> ```npx typeorm init --express --name typeorm-api --database mysql```

```
Project created inside /home/jlm/dev/typeorm-api directory.
Please wait, installing dependencies...
Done! Start playing with a new project!
```

<code style="color : greenyellow">➜</code> <code style="color : aqua">dev</code> ```cd typeorm-api```

... and inside the project, the autogenerated README.md says:

```
# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command
```

Let's give it a go - to ensure that everything is as expected


<code style="color : greenyellow">➜</code> <code style="color : aqua">typeorm-api</code> ```npm i ```

```
up to date, audited 191 packages in 843ms

45 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

<code style="color : greenyellow">➜</code> <code style="color : aqua">typeorm-api</code> ```npm start ```

```
> typeorm-api@0.0.1 start
> ts-node src/index.ts

Express server has started on port 3000. Open http://localhost:3000/users to see results
```

Entering the URL in a browser - returns this output:
```
[
    {
        "id": 1,
        "firstName": "Timber",
        "lastName": "Saw",
        "age": 27
    },
    {
        "id": 2,
        "firstName": "Phantom",
        "lastName": "Assassin",
        "age": 24
    }
]
```

Great, ready to move on!

## Hello Github

First, create repository in github interactively, then add local project to github

```
$ git init
$ git add .
$ git commit -m "initial commit" -m "npx typeorm init --express --name typeorm-api --database mysql"
$ git branch -M main
$ git remote add origin https://github.com/<MyProfile>/typeorm-api.git
$ git push -u origin main
```

### Project adjustments

#### Rename `index.ts` to `server.ts`
<code style="color : greenyellow">➜</code> <code style="color : aqua">typeorm-api</code> ```mv src/index.ts src/server.ts```

... and make package.json reflect that change
```
{
   ...
   "scripts": {
      "start": "ts-node src/server.ts",
      "typeorm": "typeorm-ts-node-commonjs"
   },
   ...
}
```

#### Collect ORM releated stuff in `src/orm/`

These things get bloated quickly. Looking forward, the aim is a folder structure with room for growth (focusing on ORM right now) - going in this direction
```
src/
    controllers/
    graphql/
    orm/
        entity/
        migration/
        subscriber/
        datasource.ts
    routes/
    utils/
    server.ts
```

Rearranging the structure ...

<code style="color : greenyellow">➜</code> <code style="color : aqua">typeorm-api</code> ```mkdir src/orm```

<code style="color : greenyellow">➜</code> <code style="color : aqua">typeorm-api</code> ```mv src/entity src/orm/entity```

<code style="color : greenyellow">➜</code> <code style="color : aqua">typeorm-api</code> ```mv src/migration src/orm/migration```

<code style="color : greenyellow">➜</code> <code style="color : aqua">typeorm-api</code> ```mv src/data-source.ts src/orm/datasource.ts```

#### Fix the imports after rearrangement

`server.ts`
```
 :
import { AppDataSource } from "./orm/datasource"
import { User } from "./orm/entity/User"
 :
```

`UserController.ts`
```
 :
import { AppDataSource } from "../orm/datasource"
import { User } from "../orm/entity/User"
 :
```

