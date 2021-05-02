# Booboo test -- Node.js Rest APIs with Express, Sequelize & MySQL example.
## 2 auth metods (OTP-MessageBird/PASSWORD-bcryptjs)
## Sequelize & MySQL, relational data base
## pagination filtering and sorting (shipping list)
```
//filter by title.
//pagination with size of the page and choosing page
//sorting by updated
```

## MODELS
### User
```
{
firstName: STRING,
email: STRING,
passwordHash: STRING
}

```
### Shipping
```
{
title: STRING,
description: STRING,
published: STRING
}

```
## ROUTES 

### USERS 
```
  // first step one time password
  router.post("/first", Users.first);

  // second step one time password
  router.post("/second", Users.second);

  // Signup new User
  router.post("/signup", Users.signup);

  // Log in new User
  router.post("/login", Users.login);

  // update User
  router.put("/:id", Users.update);

  // Delete User
  router.delete("/:id", Users.delete);
```


### SHIPPINGS 

```
  // Create a new Shipping
  router.post("/create", Shippings.create);

  // Retrieve all Shippings
  // parameters
  // const title = req.query.title;
  // const size = req.query.size || 25;
  // const page = req.query.page || 0;

  router.get("/list", Shippings.findAll);

  // Retrieve all published Shippings
  router.get("/published", Shippings.findAllPublished);

  // Retrieve a single Shipping
  router.get("/:id", Shippings.findOne);

  // Update a Shipping with id
  router.put("/:id", Shippings.update);

  // Delete a Shipping with id
  router.delete("/:id", Shippings.delete);

  // Delete all Shippings
  router.delete("/", Shippings.deleteAll);
```
## Project setup
```
npm install
```

### Run
```
nodemon server.js
```
