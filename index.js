import express from 'express'
import { port, mongo } from './config.js'
import mongoose from 'mongoose'
import session from 'express-session'
import passport from 'passport'
import http from 'http'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url';
import { router as index } from './routes/index.js'
import { router as user } from './routes/user.js'
import { router as books } from './routes/books.js'
import { router as api } from './routes/api.js'
import { logger } from './middleware/logger.js';
import { error } from './middleware/error.js';
import { initPassport } from './passport/init.js'
import flash from 'connect-flash';
import { initComments } from './comment/comments.js';
import bodyParser from 'body-parser'

const __dirname = dirname(fileURLToPath(import.meta.url));

mongoose.connect(mongo)

const app = express();
const server = http.Server(app)


app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/load', express.static(path.join(__dirname, '..', 'load')))
app.use(express.static('public'))
app.use(session({ secret: 'SECRET', resave: true, saveUninitialized: true }));
//app.use(logger)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

initPassport(passport)



app.use('/', index);
app.use('/api/user', user);
app.use('/api/books', books);
app.use('/api', api);
app.use(error)


server.listen(port, () => {
    console.log(`Сервер запущен на порту: ${port}`)
})



initComments(server);