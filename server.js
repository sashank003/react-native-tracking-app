const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./src/routes/authRoutes');
const requireAuth = require('./src/middlewares/requireAuth');
const trackRoutes = require('./src/routes/trackRoutes');


const app = express();

app.use(express.json());
app.use(authRouter);
app.use(trackRoutes);


const mongoUri = 'mongodb+srv://sashank:sashank@cluster0.p4usr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('connected to db');
});

mongoose.connection.on('error', () => {
    console.error('error connecting to db');
});

app.get('/', requireAuth, (req, res) => {
    res.json(req.user.email);
})

app.listen(3000, () => {console.log('listening')});