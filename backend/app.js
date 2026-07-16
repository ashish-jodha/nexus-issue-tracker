const express = require('express');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/user');
const mongoose = require('mongoose');
const app = express();

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/project');
const ticketRoutes = require('./routes/ticket');

mongoose.connect('mongodb://127.0.0.1:27017/nexus')
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());

app.use(session({
    secret: "thisismysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/' , (req , res) => {
    res.redirect('/api/projects');
})

app.use("/api/auth" , authRoutes);
app.use("/api/projects" , projectRoutes);
app.use("/api/projects/:projectId/tickets" , ticketRoutes);

const PORT = 3000;
app.listen(PORT , () => {
    console.log(`App is listening to PORT: ${PORT}`);
})