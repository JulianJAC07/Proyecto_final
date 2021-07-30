"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    constructor() {
        this.host = 'localhost';
        this.puerto = 3001;
        this.app = express_1.default();
    }
    start(callback) {
        this.app.listen(this.puerto, this.host, callback);
    }
}
exports.default = Server;
