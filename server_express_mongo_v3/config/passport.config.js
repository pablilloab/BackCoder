import passport from "passport";
import local from "passport-local";
import { createHash, isValidPassword } from "../src/utils/hashPassword.js";
import userManager from "../dao/mongoDao/user.dao.js";
import google from "passport-google-oauth20";

const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;

const initializePassport = () => {
  // init strategies
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, userName, password, done) => {
        try {
          const { first_name, last_name, email, age } = req.body;

          const user = await userManager.getByEmail(userName);
          if (user) return done(null, false, { message: "El usuario ya existe" });

          const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password),
            age,
          };

          const createUser = await userManager.addUser(newUser);

          return done(null, createUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userManager.getById(id);
    done(null, user);
  });

  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
      try {
        const user = await userManager.getByEmail(username);
        if (!user || !isValidPassword(user, password)) return done(null, false, { message: "Email o Password no válidos" });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: "",
        clientSecret: "",
        callbackURL: "http://localhost:8080/users/login/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { name, emails } = profile;

          const user = {
            first_name: name.givenName,
            last_name: name.familyName,
            email: emails[0].value,
          };

          const existUser = await userManager.getByEmail(user.email);
          if (existUser) return done(null, existUser);

          const newUser = await userManager.addUser(user);

          done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializePassport;
