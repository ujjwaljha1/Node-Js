# Node.js and MongoDB 📚🚀

![Node.js](https://nodejs.org/static/images/logo.svg)

## Introduction 🌟
Welcome to this comprehensive guide on using Node.js and MongoDB together! This README file will take you through the basics to advanced concepts, showcasing how these technologies work individually and together. You'll learn how to set up, code, and interact with a Node.js server and a MongoDB database with examples, images, and videos. Let's dive in!

## Table of Contents 📑
- [Getting Started](#getting-started-)
- [Setting Up Node.js](#setting-up-nodejs-)
- [Creating a Simple Node.js Server](#creating-a-simple-nodejs-server-)
- [Setting Up MongoDB](#setting-up-mongodb-)
- [Connecting Node.js to MongoDB](#connecting-nodejs-to-mongodb-)
- [CRUD Operations](#crud-operations-)
  - [Create (POST)](#create-post-)
  - [Read (GET)](#read-get-)
  - [Update (PUT)](#update-put-)
  - [Delete (DELETE)](#delete-delete-)
- [Advanced Concepts](#advanced-concepts-)
  - [Middleware](#middleware-)
  - [Authentication](#authentication-)
  - [Error Handling](#error-handling-)
- [Images & Videos](#images--videos-)

## Getting Started 🚀

### Prerequisites 🛠️
- Node.js installed on your machine. [Download Node.js](https://nodejs.org/)
- MongoDB installed on your machine. [Download MongoDB](https://www.mongodb.com/try/download/community)

## Setting Up Node.js 🖥️

1. **Initialize a Node.js project:**

   ```bash
   mkdir myproject
   cd myproject
   npm init -y
   ```

2. **Install Express:**

   ```bash
   npm install express
   ```

3. **Create a simple `server.js` file:**

   ```javascript
   const express = require('express');
   const app = express();
   const PORT = 3000;

   app.get('/', (req, res) => {
     res.send('Hello World!');
   });

   app.listen(PORT, () => {
     console.log(`Server is running on http://localhost:${PORT}`);
   });
   ```

   **Run your server:**

   ```bash
   node server.js
   ```

   🎉 Your Node.js server is up and running!

## Creating a Simple Node.js Server 🌐

1. **Basic Server Code:**

   ```javascript
   const express = require('express');
   const app = express();
   const PORT = 3000;

   app.use(express.json());

   app.get('/', (req, res) => {
     res.send('Hello, this is your server speaking!');
   });

   app.listen(PORT, () => {
     console.log(`Server is running on http://localhost:${PORT}`);
   });
   ```

## Setting Up MongoDB 🗄️

1. **Start MongoDB server:**

   ```bash
   mongod
   ```

2. **Install Mongoose to connect MongoDB with Node.js:**

   ```bash
   npm install mongoose
   ```

## Connecting Node.js to MongoDB 🌐➡️🗄️

1. **Connection Code:**

   ```javascript
   const mongoose = require('mongoose');

   mongoose.connect('mongodb://localhost:27017/mydatabase', {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   });

   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'connection error:'));
   db.once('open', function() {
     console.log('Connected to MongoDB');
   });
   ```

## CRUD Operations 🛠️

### Create (POST) ➕

1. **Creating a Schema and Model:**

   ```javascript
   const mongoose = require('mongoose');

   const userSchema = new mongoose.Schema({
     name: String,
     email: String,
     age: Number,
   });

   const User = mongoose.model('User', userSchema);
   ```

2. **POST Route:**

   ```javascript
   app.post('/api/users', async (req, res) => {
     const user = new User(req.body);
     try {
       await user.save();
       res.status(201).send(user);
     } catch (e) {
       res.status(400).send(e);
     }
   });
   ```

### Read (GET) 📖

1. **GET Route:**

   ```javascript
   app.get('/api/users', async (req, res) => {
     try {
       const users = await User.find({});
       res.send(users);
     } catch (e) {
       res.status(500).send();
     }
   });

   app.get('/api/users/:id', async (req, res) => {
     const _id = req.params.id;
     try {
       const user = await User.findById(_id);
       if (!user) {
         return res.status(404).send();
       }
       res.send(user);
     } catch (e) {
       res.status(500).send();
     }
   });
   ```

### Update (PUT) ✏️

1. **PUT Route:**

   ```javascript
   app.put('/api/users/:id', async (req, res) => {
     try {
       const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
       if (!user) {
         return res.status(404).send();
       }
       res.send(user);
     } catch (e) {
       res.status(400).send(e);
     }
   });
   ```

### Delete (DELETE) 🗑️

1. **DELETE Route:**

   ```javascript
   app.delete('/api/users/:id', async (req, res) => {
     try {
       const user = await User.findByIdAndDelete(req.params.id);
       if (!user) {
         return res.status(404).send();
       }
       res.send(user);
     } catch (e) {
       res.status(500).send();
     }
   });
   ```

## Advanced Concepts 🧠

### Middleware 🛤️

Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle. Middleware can execute code, make changes to the request and response objects, end the request-response cycle, and call the next middleware function.

**Example:**

```javascript
const myMiddleware = (req, res, next) => {
  console.log('Middleware executed!');
  next();
};

app.use(myMiddleware);
```

### Authentication 🔒

**JWT Authentication:**

1. **Install JSON Web Token:**

   ```bash
   npm install jsonwebtoken
   ```

2. **Create JWT:**

   ```javascript
   const jwt = require('jsonwebtoken');

   const token = jwt.sign({ _id: user._id.toString() }, 'secretkey');
   ```

3. **Verify JWT:**

   ```javascript
   const auth = (req, res, next) => {
     const token = req.header('Authorization').replace('Bearer ', '');
     const decoded = jwt.verify(token, 'secretkey');
     req.user = decoded;
     next();
   };

   app.get('/api/protected', auth, (req, res) => {
     res.send('This is a protected route');
   });
   ```

### Error Handling 🛠️

**Centralized Error Handling:**

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```



## Conclusion 🎉

This guide covered the essentials of setting up a Node.js server and connecting it to a MongoDB database. You learned about creating routes, handling requests, performing CRUD operations, and implementing advanced concepts like middleware, authentication, and error handling. With these skills, you're now ready to build powerful web applications using Node.js and MongoDB!

Feel free to contribute, raise issues, or ask questions. Happy coding! 💻🚀
