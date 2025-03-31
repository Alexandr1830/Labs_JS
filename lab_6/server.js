const express = require('express');
const stocks = require('./internal/stocks');
 

const app = express();
const HOST = 'localhost';
const PORT = 8080;

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/stocks', stocks);

//Запуск сервера
app.listen(PORT, HOST, () => {
    console.log(`Сервер запущен по адресу http://${HOST}:${PORT}`);
});