let {Sequelize, DataTypes} = require('sequelize');

let env = process.env.NODE_ENV || 'development'
// if running at heroku it will have set an environment variable
// called NODE_ENV = 'production'... and if running locally ... env = 'development'

let config = require(__dirname + '/../config.json')[env]

let db = {}

let sequelize

if (config.use_env_variable) {
    // at Heroku, use postgres
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
    // locally, use SQLite (development mode)
    sequelize = new Sequelize(config)
}

let studentModel = require('./student')(sequelize, DataTypes)

db[studentModel.name] = studentModel

db.sequelize = sequelize // info on how to connect to the database
db.Sequelize = Sequelize // reference to sequelize library

module.exports = db