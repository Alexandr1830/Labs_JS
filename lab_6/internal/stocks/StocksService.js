const { StocksDAO } = require('./StocksDAO');

class StocksService {
    static findStocks(id) {
        if (id !== undefined) {
            return StocksDAO.findById(id);
        }

        return StocksDAO.find();
    }

    static addStock(stock) {
        return StocksDAO.insert(stock);
    }

    static deleteStock(id) {
        return StocksDAO.delete(id);
    }

    static updateStock(id, data) {
        return StocksDAO.update(id, data);
    }
}

module.exports = {
    StocksService,
};
