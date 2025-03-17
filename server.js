const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors'); 

const app = express();
app.use(cors()); 
app.use(express.json()); 

const HOST = '0.0.0.0';
const PORT = 8000;
const STORAGE_NAME = 'db/stocks.json';

// 📌 Функция для чтения данных из JSON-файла
const readJson = () => {
    const file = fs.readFileSync(path.join(__dirname, STORAGE_NAME), "utf8");
    return JSON.parse(file);
};

// 📌 Функция для записи данных в JSON-файл
const writeJson = (data) => {
    fs.writeFileSync(path.join(__dirname, STORAGE_NAME), JSON.stringify(data, null, 2), "utf8");
};

// 📌 Получить все карточки (GET /stocks)
app.get('/stocks', (req, res) => {
    res.json(readJson());
});

// 📌 Получить карточку по ID (GET /stocks/:id)
app.get('/stocks/:id', (req, res) => {
    const numberId = Number.parseInt(req.params.id);
    if (Number.isNaN(numberId)) {
        return res.status(400).json({ status: 'Bad Request', message: 'id must be a number!' });
    }
    const stock = readJson().find((item) => item.id === numberId);
    stock ? res.json(stock) : res.status(404).json({ status: 'Not Found', message: `Stock with id ${numberId} not found` });
});

// 📌 Добавить новую карточку (POST /stocks)
app.post('/stocks', (req, res) => {
    const { title, text, src } = req.body;
    if (!title || !text || !src) {
        return res.status(400).json({ status: 'Bad Request', message: 'Missing title, text, or src' });
    }
    const stocks = readJson();
    const newStock = { id: Date.now(), title, text, src };
    stocks.push(newStock);
    writeJson(stocks);
    res.status(201).json(newStock);
});

// 📌 Удалить карточку по ID (DELETE /stocks/:id)
app.delete('/stocks/:id', (req, res) => {
    const numberId = Number.parseInt(req.params.id);
    if (Number.isNaN(numberId)) {
        return res.status(400).json({ status: 'Bad Request', message: 'id must be a number!' });
    }
    let stocks = readJson();
    const newStocks = stocks.filter((item) => item.id !== numberId);
    if (stocks.length === newStocks.length) {
        return res.status(404).json({ status: 'Not Found', message: `Stock with id ${numberId} not found` });
    }
    writeJson(newStocks);
    res.status(200).json({ message: `Stock with id ${numberId} deleted` });
});

// 📌 Запуск сервера
app.listen(PORT, HOST, () => {
    console.log(`Сервер запущен по адресу http://${HOST}:${PORT}`);
});