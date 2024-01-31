# Memotest - Next.js & Laravel + Lighthouse

#### Simple Memotest game made with

##### Backend Dockerization: Sails
##### Back: MySQL - Lighthouse - Laravel
##### Front: Next.js - TypeScript - Shadcn - Tailwind


# Setup
## Prerequisites:

In order to be able to setup this project in your local machine you will need

 - [Laravel Sail](https://laravel.com/docs/10.x/sail) or [Docker Compose](https://docs.docker.com/compose/)
 - [NPM](https://www.npmjs.com/) or [PNPM](https://pnpm.io/)


### 1- Clone the repo in your desired directory

### 2- Running the Server
Navigate into the server folder

cd memotest-server

Once inside run one of these commands:

##### If you are using Sail  
     sail up
##### If you are using Docker compose
     docker-compose up

*You can run both commands with parameter -d in case you want it to be running in the background, in that case for terminating the process you should run same command but "down" instead of "up"*

 **Running Migrations and seeding the db**

##### If you are using Sail  run these:

    sail php artisan migrate
    sail php php artisan db:seed --class=MemotestSeeder

##### If you are using Docker run these:

    docker exec memotest-server-laravel.test-1 bash -c "php artisan migrate"
    docker exec memotest-server-laravel.test-1 bash -c "php artisan db:seed --class=MemotestSeeder"
*Make sure the docker container name is correct, if not check it by doing 'docker ps' fix and run again.*

**That's it for  the backend**
You can navigate to localhost:3001 and see the backend screen, or navigate to localhost:3001/graphiql for the GraphQL playground,
### 3- Running the Application

Navigate into the next folder

cd memotest-next

Once inside run one of these commands:

##### If you are using npm  
     npm i
##### If you are using pnpm
     pnpm i

Once the installation finishes, you need to run this command for it to be served

##### If you are using npm  
     npm run dev
##### If you are using pnpm
     pnpm run dev

**That's it for  the App**
You can now navigate to localhost:3000 and see the application, and begin playing with it!




##### Made by Saresq - 2024 - *santiago.aresq@gmail.com contact me if you need any help!*
