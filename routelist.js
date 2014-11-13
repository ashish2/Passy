// App routes function to go to

// Todo
app.post("/create", routes.create );
app.get("/destroy/:id", routes.destroy);
app.get("/edit/:id", routes.edit);
app.post("/update/:id", routes.update);

// Users
// Version 1: Using exports.propertyName, and calling the property here
app.get('/users', user.list );
// Version 2: Not using exports.propertyName, and instead, just using, module.exports as function & callijng it
//app.get('/users', user );

// SecretQuestion
app.get("/secretquestion", secretquestion.index);
app.get("/secretquestion/destroy/:id", secretquestion.destroy);
app.post("/secretquestion/create", secretquestion.create);

// SecretAnswer
app.get("/secretanswer", secretanswer.index);
//app.get("/secretanswer/destroy/:id", secretanswer.destroy);
app.get("/secretanswer/create/:id", secretanswer.create.get);
app.post("/secretanswer/create/:id", secretanswer.create.post);

// KeyPass
app.get("/keyspass", keyspass.index);

app.get("/keyspass/destroy/:id", keyspass.destroy);
app.post("/keyspass/check", keyspass.check);
app.post("/keyspass/create", keyspass.create);
// Showing all keys pass of a user
app.get("/keyspass/show", keyspass.show);

// Default
app.get('/', keyspass.index);

