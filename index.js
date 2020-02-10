const express = require("express");
const path = require("path");
const csrf = require('csurf');
const flash = require('connect-flash');
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const homeRouter = require("./routes/home");
const addRouter = require("./routes/add");
const coursesRouter = require("./routes/courses");
const cardRouter = require("./routes/card");
const ordersRouter = require("./routes/orders");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const varMiddleware = require('./middleware/variables.js');
const userMiddleware = require('./middleware/user.js');
const keys = require('./keys/index');
const errorHandler = require("./middleware/error");
const fileMiddleware = require("./middleware/file");
const cookieParser = require("cookie-parser");
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    helpers: require('./utils/hbs-helper')
});

const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGODB_URI
});

const PORT = process.env.PORT || 3000;

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, "images")));
app.use(express.urlencoded({extended: true}));

app.use(fileMiddleware.single('avatar'));
app.use(csrf({ cookie: true }));
app.use(flash());
app.use(helmet());
app.use(compression());
app.use(varMiddleware);
app.use(userMiddleware);

app.use("/", homeRouter);
app.use("/add", addRouter);
app.use("/courses", coursesRouter);
app.use("/card", cardRouter);
app.use("/orders", ordersRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);

app.use(errorHandler);

async function start(){
    try{
        await mongoose.connect(keys.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        app.listen(PORT, () => {
            console.log(`Localhost: ${PORT}`);
        });
    } catch (e) {
        console.log(e)
    }

}

start();