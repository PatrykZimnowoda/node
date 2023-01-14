const { request } = require("express");
const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const app = express();
app.use(express.json());
const database = {
  user: [
    {
      id: "123",
      name: "John",
      email: "Johny@gmail.com",

      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "Sally@gmail.com",

      entries: 0,
      joined: new Date(),
    },
    {
      login: [
        {
          id: "987",
          hash: "",
          email: "Johny@gmail.com",
        },
      ],
    },
  ],
};
app.get("/", (req, res) => {
  res.send(database.user);
});

app.post("/signin", (req, res) => {
  let found = false;
  for (let i = 0; i < database.user.length; i++) {
    if (
      req.body.email === database.user[i].email &&
      req.body.password === database.user[i].password
    ) {
      found = true;
      break;
    }
  }
  if (found) {
    res.json("Success");
  } else {
    res.status(400).json("error");
  }
});
app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, null, null, function (err, hash) {
    console.log(hash);
    // Store hash in your password DB.
  });
  database.user.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.user[database.user.length - 1]);
});
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.user.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("not found");
  }
});
app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.user.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json("not ");
  }
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
