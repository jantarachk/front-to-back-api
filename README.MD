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

## Step 3 - Git
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