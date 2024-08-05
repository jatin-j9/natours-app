const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

/* UNCAUGHT EXCEPTIONS */
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception! Shutting Down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

/* CONNECTING TO DATABASE */
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connection successful!'));

/* STARTING THE SERVER */
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}... `);
});

/* UNHANDLED REJECTIONS */
process.on('unhandledRejection', (err) => {
  console.log('Unhandler Rejection! Shutting Down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED! Shutting down gracefull...');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});

/////////////////////////
///Previous Learnings///
////////////////////////

/*
const testTour = new Tour({
  // new document using the model
  name: 'The Park Camper',
  price: 997,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log('Error!💥:', err);
  });
*/
