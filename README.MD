# Server

## Step 1 - Create package
```bash
npm init -y
```

## Step 2 - Install package
```bash
npm install express nodemon cors morgan bcryptjs jsonwebtoken zod prisma
npx prisma init 
```

## Step 3 - Git Initialize
```bash
git init
git add .
git commit -m "Initialize project"
```

Next step is copy code from repo only first time.
```bash
git remote add origin https://github.com/jantarachk/front-to-back-api.git
git branch -m main
git push -u origin main
```

When update code
```bash
git add .
git commit -m "message"
git push
```

## Step 4 - Update package JSON
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
  }
```
and code inside index.js
```js
//import library
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const app = express()

//middlewares
app.use(cors()) // Allow cross domain connection
app.use(morgan("dev")) // Show log in terminal
app.use(express.json()) // reading JSON

//Routing

//Start Server
const PORT = 8000
app.listen(PORT, ()=> console.log(`Server is running on Port ${PORT}`))
```