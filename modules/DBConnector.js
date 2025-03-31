const fs = require('fs');
const path = require('path');

class DBConnector {
    constructor(filename) {
        this.path = path.join(process.cwd(), 'db', filename);
    }

    readFile() {
        return fs.readFileSync(this.path, 'utf-8');
    }

    writeFile(data) {
        fs.writeFileSync(this.path, data, 'utf-8');
    }
}

module.exports = {
    DBConnector,
};
