const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.BD, process.env.USER, process.env.PASS, {
    host: process.env.HOST,
    dialect: 'mysql',
    dialectOptions: {
        dateStrings: true,
        typeCast: true,
        timezone: "+0:00"
      },
      timezone: "+0:00", 
});

sequelize.authenticate().then(()=>{
    console.log('conectado com sucesso!')
}).catch((err)=>{
    console.log(`Falha ao se conectar: ${err}`)
});


module.exports = { Sequelize: Sequelize,
                   sequelize: sequelize }