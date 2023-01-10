const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3500;

//cross origin resource sharing
app.use(cors());

//middleware to handle static files
app.use('/', express.static(path.join(__dirname, '/public')));

app.get('^/$|/login$|/home', (req, res) =>{
    //res.sendFile('./views/home.html', { root: __dirname });
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/games', (req, res) =>{
    res.sendFile(path.join(__dirname, 'views', 'game.html'));
});

app.get('/createaccount', (req, res) =>{
    res.sendFile(path.join(__dirname, 'views', 'newAccount.html'));
});

app.get('/*', (req, res) => {
    res.sendStatus(404);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));