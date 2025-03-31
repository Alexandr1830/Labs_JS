const express = require('express');
const stocks = require('./internal/stocks');
 

const app = express();
const HOST = '0.0.0.0';
const PORT = 6000;

app.use(express.json());

// CORS middleware
/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header("Content-Type", "application/json; charset=utf-8");
    
    // Обработка preflight запросов
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    
    next();
});*/

app.use('/stocks', stocks);

//Запуск сервера
app.listen(PORT, HOST, () => {
    console.log(`Сервер запущен по адресу http://${HOST}:${PORT}`);
});