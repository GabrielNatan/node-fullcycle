dockerize -wait tcp://db:3306 -timeout 1m &&
npm i &&
npm start