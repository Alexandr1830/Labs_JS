const { StocksRepository } = require('./StocksRepository');

class StocksDAO {
    constructor(id, src, title, text, text1, text2, text3, text4) {
        this.id = id;
        this.src = src;
        this.title = title;
        this.text = text;
        this.text1 = text1;
        this.text2 = text2;
        this.text3 = text3;
        this.text4 = text4; 
    }

    static _validateId(id) {
        const numberId = Number.parseInt(id);
        if (Number.isNaN(numberId)) {
            throw new Error('Invalid id');
        }
    }

    static find() {
        const stocks = StocksRepository.read();

        return stocks.map(({ id, src, title, text, text1, text2, text3, text4 }) => {
            return new this(id, src, title, text, text1, text2, text3, text4);
        });
    }

    static findById(id) {
        this._validateId(id);

        const stocks = StocksRepository.read();
        const stock = stocks.find((s) => s.id === id);

        if (!stock) {
            throw new Error(`Stock with id ${id} not found`);
        }

        return new this(stock.id, stock.src, stock.title, stock.text, stock.text1, stock.text2, stock.text3, stock.text4);
    }

    static insert(stock) {
        const stocks = StocksRepository.read();
        
        const existingStock = stocks.find(s => s.id === stock.id);
        if (existingStock) {
            throw new Error(`Stock with id ${stock.id} already exists`);
        }
        
        StocksRepository.write([...stocks, stock]);
        return new this(stock.id, stock.src, stock.title, stock.text, stock.text1, stock.text2, stock.text3, stock.text4);
    }
    

    static delete(id) {
        this._validateId(id);

        const stocks = StocksRepository.read();
        const filteredStocks = stocks.filter((s) => s.id !== id);

        StocksRepository.write(filteredStocks);

        return filteredStocks.map(({ id, src, title, text, text1, text2, text3, text4 }) => {
            return new this(id, src, title, text, text1, text2, text3, text4);
        });
    }

    static update(id, stockData) {
        this._validateId(id);
        
        const stocks = StocksRepository.read();
        const stockIndex = stocks.findIndex(s => s.id === id);
        
        if (stockIndex === -1) {
            throw new Error(`Stock with id ${id} not found`);
        }
        
        const updatedStock = {
            ...stocks[stockIndex],
            ...stockData,
            id: id 
        };
        
        stocks[stockIndex] = updatedStock;
        StocksRepository.write(stocks);
        
        return new this(updatedStock.id, updatedStock.src, updatedStock.title, updatedStock.text, updatedStock.text1, updatedStock.text2, updatedStock.text3, updatedStock.text4);
    }
    

    toJSON() {
        return {
            id: this.id,
            src: this.src,
            title: this.title,
            text: this.text,
            text1: this.text1,
            text2: this.text2,
            text3: this.text3,
            text4: this.text4
        };;
    }
}

module.exports = {
    StocksDAO,
};