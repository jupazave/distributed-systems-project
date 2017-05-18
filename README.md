# distributed-systems-project

## Stack
* NodeJS
* ExpressJS
* MySQL
* Sequelize
* Gulp (`npm install --global gulp`)

## Setup ##
### Requirements ###
* NodeJS >= 6.9.5
* npm >= 3.x.x

### Install ###
* ` $ git clone git@gitlab.com:makerlabmx/blastbot-enterprise.git`
* ` $ cd enterprise-cloud`
* ` $ npm install`

### Run ###
* ` $ gulp serve`

It should automatically open the client in your browser when ready.

APP should be available at [http://localhost:3000](http://localhost:3000)

### Deploy Production ###
#### Only Fist Time
* ` $ cd XXXXX`
* ` $ git clone XXXXXX dist`
* ` $ cd dist`
* ` $ git checkout dist`

#### Repeat each time

* ` $ gulp build`
* ` $ gulp buildcontrol:dist`

Alternative

* ` $ gulp push`

Pull from dist into production environment


## Database ##
### Development commands ###
* ` $  node_modules/.bin/sequelize db:migrate`
* ` $  node_modules/.bin/sequelize db:migrate:undo`
* ` $  node_modules/.bin/sequelize db:migrate:undo:all`
* ` $  node_modules/.bin/sequelize migration:create --name 'migration-name'`
* ` $  node_modules/.bin/sequelize db:seed`
* ` $  node_modules/.bin/sequelize db:seed:undo`


## TODO ##
1. Create tests


This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 4.1.0.
