const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(`mysql://root:@localhost:3306/expressoft`);

async function connectToDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database', error);
  }
}

connectToDB();
