import users from "./register.service.js";

export function loginUser(username, password, callback) {
  users.findOne({ username, password }, (err, user) => {
    if (err) {
      return callback(err);
    }

    if (!user) {
      return callback(null, null, "Invalid username or password");
    }

    callback(null, user);
  });
}
