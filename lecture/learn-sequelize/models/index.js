const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

// 인스턴스화
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 여기서 user와 comment에 있는 매개변수로 이어지게 된다.
db.User = require('./user')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

// 두 테이블에 관계가 있을 때 참조
db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id'});
db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id'});

module.exports = db;