import Datastore from "nedb";

const users = new Datastore({ filename: "./data/users.json" });
users.loadDatabase((err) => console.log(err));

export function registerUser(username, password, name, surname, callback) {
  users.findOne({ username }, (err, user) => {
    if (err) {
      return callback(err);
    }

    if (user) {
      return callback(null, null, "Username already exists");
    }

    users.insert({ username, password, name, surname }, (err, newUser) => {
      if (err) {
        return callback(err);
      }
      callback(null, newUser);
    });
  });
}

export default users;
