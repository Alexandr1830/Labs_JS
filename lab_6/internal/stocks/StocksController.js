const { StocksService } = require('./StocksService');

class StocksController {
    static findStocks(req, res) {
        try {
            const data = StocksService.findStocks();

            if (Array.isArray(data)) {
                res.status(200).send(data.map(stock => stock.toJSON()));
            } else {
                res.status(200).send(data.toJSON());
            }
        } catch (err) {
            res.status(400).send({
                status: 'Bad Request',
                message: err.message,
            });
        }
    }

    static findStockById(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            const data = StocksService.findStocks(id);

            res.status(200).send(data.toJSON());
        } catch (err) {
            res.status(400).send({
                status: 'Bad Request',
                message: err.message,
            });
        }
    }

    static addStock(req, res) {
        try {
            const body = req.body;

            const newStock = {
                id: Date.now(),
                src: body.src,
                title: body.title,
                text: body.text,
                text1: body.text1,
                text2: body.text2,
                text3: body.text3,
                text4: body.text4,
            };

            const inserted = StocksService.addStock(newStock);
            res.status(201).send(inserted.toJSON());
        } catch (err) {
            res.status(400).send({
                status: 'Bad Request',
                message: err.message,
            });
        }
    }

    static deleteStock(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            const updated = StocksService.deleteStock(id);

            res.status(200).send(updated.map(stock => stock.toJSON()));
        } catch (err) {
            res.status(400).send({
                status: 'Bad Request',
                message: err.message,
            });
        }
    }

    static updateStock(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            const updated = StocksService.updateStock(id, req.body);

            res.status(200).send(updated.toJSON());
        } catch (err) {
            res.status(400).send({
                status: 'Bad Request',
                message: err.message,
            });
        }
    }
}

module.exports = {
    StocksController,
};
