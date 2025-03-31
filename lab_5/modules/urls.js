class Urls {
    constructor() {
        this.url = 'http://localhost:8080'
    }

    getStocks() {
        return `${this.url}/stocks`;
 
    }

    getStock(id){
        return `${this.url}/stocks/${id}`;
    }
}

export const urls = new Urls()