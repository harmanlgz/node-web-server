const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log+'\n')
    next();
    // app.use();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public')); //middleware
 
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Harman',
    //     likes: [
    //         'a', 'b', 'c'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        // currentYear: new Date().getFullYear(),
        welcomeMessage: 'Hey!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
        // currentYear: new Date().getFullYear()
    });
    // res.send('About page');
});


app.get('/projects', (req, res) => {
    res.render('project.hbs', {
        pageTitle: 'Projects Page',
        welcomeMessage: 'Portfolio page here'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error handling request'
    });
});

// app.listen(3000, () => {
//     console.log('Server is up on port 3000');
// });

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});