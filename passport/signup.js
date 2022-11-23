import { UserModel } from "../model/user.js";
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';

export const signup = function (passport) {

    passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    },
        function (req, username, password, done) {

            const findOrCreateUser = function () {
                UserModel.findOne({ username: username }, (err, user) => {
                    if (err) {
                        console.log('Ошибка егистрации: ', err);
                        return done(err);
                    }

                    const email = req.body.email;

                    if (user) {
                        console.log('Пользователь с таким логином уже есть: ' + username);
                        return done(null, false, req.flash('message', 'Пользователь с таким логином уже есть'));
                    } else {
                        const newUser = new UserModel({
                            username: username,
                            password: createHash(password),
                            email: email
                        });

                        newUser.save((err) => {
                            if (err) {
                                console.log('Ошибка при сохранении пользователя: ', err);
                                throw err;
                            }

                            console.log('Пользователь зарегистрирован');
                            return done(null, newUser);
                        });
                    }
                });
            }

            process.nextTick(findOrCreateUser);
        })
    );

    const createHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);
    }
};