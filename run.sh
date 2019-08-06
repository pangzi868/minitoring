./node_modules/.bin/pm2 delete tianwei-mobile
NODE_ENV=production ./node_modules/.bin/pm2 start server/index.js --name tianwei-mobile
