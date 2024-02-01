
#  Memotest - Next.js & Laravel + Lighthouse
####  Simple Memotest game made with
#####  Backend Dockerization: Sails
#####  Back: MySQL - Lighthouse - Laravel
#####  Front: Next.js - TypeScript - Shadcn - Tailwind
#  Setup
##  Prerequisites:
In order to be able to setup this project in your local machine you will need
-  [Laravel Sail](https://laravel.com/docs/10.x/sail) & [Docker Compose](https://docs.docker.com/compose/)
-  [NPM](https://www.npmjs.com/) or [PNPM](https://pnpm.io/)
###  1- Clone the repo in your desired directory
###  2- Running the Server
**Navigate into the server folder**

    cd memotest-server

**Create .env**
Create a copy of **.env.example** and name it **.env**, since this is not yet production ready, all the keys needed are already uploaded inside the example, you wont need to ask for keys or credentials
#####  *[THIS IS ONLY FOR EASE OF USE - ONCE APPROVED AND DEPLOY READY THIS WILL NO LONGER BE THE CASE]*

**Run Containers**

> In case you don't have Sails installed, you must run
> 
> 
> `composer require laravel/sail --dev`
> 
> If you do not have composer installed, there is a workaround.
> Here is the [explanation](https://laravel.com/docs/9.x/sail#installing-composer-dependencies-for-existing-projects), but basically you can run a docker component with php and composer to
> install all the files needed to run sails.
> Since we are using php 8.2 this is the command:
> 
> 
>      docker run --rm \
>      -u "$(id -u):$(id -g)" \
>      -v "$(pwd):/var/www/html" \
>      -w /var/www/html \
>      laravelsail/php82-composer:latest \
>      composer install --ignore-platform-reqs
>  
> Also, for running sails command [you can assign a shell alias](https://laravel.com/docs/9.x/sail#configuring-a-shell-alias) to use *sail* instead of *./vendor/bin/sail*, if you dont add the alias please change it on all sail commands to work properly.

Once inside run these commands:

    sail up

*You can run this with parameter -d in case you want it to be running in the background, in that case for terminating the process you should run same command but "down" instead of "up"*

**Running Migrations and seeding the db**
#####  If you run sail up without -d you should open a new tab and navigate into ./memotest-server to run these:

    sail php artisan migrate
    sail php artisan db:seed --class=MemotestSeeder

**That's it for the backend**
You can navigate to localhost:3001 and see the backend screen, or navigate to localhost:3001/graphiql for the GraphQL playground,

###  3- Running the Application
Navigate into the next folder

    cd memotest-next

Once inside run one of these commands:
#####  If you are using npm

    npm i

#####  If you are using pnpm

    pnpm i

Once the installation finishes, you need to run this command for it to be served
#####  If you are using npm

    npm run dev

#####  If you are using pnpm

    pnpm run dev

**That's it for the App**

You can now navigate to localhost:3000 and see the application, and begin playing with it!


## Testing
In order to be able to test, make sure you have .env.testing created (it should be there, but check it anyways)
In case you dont have it copy same as .env but change to have this key

    DB_DATABASE=testing

  After that you will need to run migrations
  

    sail php artisan migrate --env=testing
   
   All set, you should now be able to run the test suite:

    sail php artisan test

  if you want for any future test you can also seed the testing db

    php artisan db:seed --env=testing

## Storybook
In order to be able to see storybook, you need to run this command

#####  If you are using npm

    npm run storybook

#####  If you are using pnpm

    pnpm run storybook

#
#

#####  Made by Saresq - 2024 - *santiago.aresq@gmail.com contact me if you need any help!*
