./node_modules/.bin/pm2 delete frontEnd
NODE_ENV=production ./node_modules/.bin/pm2 start server/index.js --name frontEnd
