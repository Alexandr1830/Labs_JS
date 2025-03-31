const { StocksService } = require('./StocksService');

class StocksController {
    static findStocks(req, res) {
        try {
            res.send(StocksService.findStocks());
        } catch (err) {
            res.status(400).send({ status: 'Bad Request', message: err.message });
        }
    }

    static findStockById(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            res.send(StocksService.findStocks(id));
        } catch (err) {
            res.status(400).send({ status: 'Bad Request', message: err.message });
        }
    }

    static addStock(req, res) {
        try {
            res.send(StocksService.addStock(req.body));
        } catch (err) {
            res.status(400).send({ status: 'Bad Request', message: err.message });
        }
    }

    static deleteStock(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            /*res.send(StocksService.deleteStock(id));*/
            const result = StocksService.deleteStock(id);
            res.status(204).end();
        } catch (err) {
            res.status(400).send({ status: 'Bad Request', message: err.message });
        }
    }

    static updateStock(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            /*res.send(StocksService.updateStock(id, req.body));*/
            const updated = StocksService.updateStock(id, req.body);
            res.status(200).json(updated);
        } catch (err) {
            res.status(400).send({ status: 'Bad Request', message: err.message });
        }
    }
    
}

module.exports = {
    StocksController,
};
