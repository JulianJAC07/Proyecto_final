"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conectionMySql_1 = __importDefault(require("../bin/conectionMySql"));
const query = (query, variables = []) => {
    return new Promise((resolve, reject) => {
        conectionMySql_1.default.query(query, variables, (error, result) => {
            if (error) {
                return reject(error);
            }
            else {
                return resolve(result);
            }
        });
    });
};
exports.default = query;
