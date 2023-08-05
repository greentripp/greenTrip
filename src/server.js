const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: `${__dirname}/.env` });

const PORT = process.env.PORT || 8008;

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log(`Uncaught Exception , 💥 Shutting down...`);

  process.exit(1);
});
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.set('strictQuery', false);

mongoose.connect(DB).then(() => {
  console.log('DB connection successfully!');
});
app.listen(PORT, () => {
  console.log(`Listen on ${PORT}`);
});
