const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const readline = require('readline');
require('dotenv').config();

const app = express();
const PORT = process.argv[2] || 3000;

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.yntp638.mongodb.net/?retryWrites=true&w=majority`,
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        dbName: `${process.env.MONGO_DB_NAME}`
     }
  );

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if there's an error
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use('/', require('./routes/home'));
app.use('/apply', require('./routes/apply'));
app.use('/processApplication', require('./routes/processApplication'));
app.use('/reviewApplication', require('./routes/reviewApplication'));

app.listen(PORT, () => {
console.log(`Web server started and running at http://localhost:${PORT}`);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.setPrompt('Stop to shutdown the server: ');

    rl.prompt();

    rl.on('line', (line) => {
    if (line.trim() === 'stop') {
        console.log('Shutting down the server');
        process.exit(0);
    } else {
        console.log('Invalid command: ' + line.trim());
    }

    rl.prompt();
    }).on('close', () => {
        console.log('Server has been stopped.');
        process.exit(0);
    });
});

