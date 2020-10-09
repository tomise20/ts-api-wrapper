"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
class Wrapper {
    constructor() {
        this.checkStatus = (statusCode) => {
            if (statusCode == 403 || statusCode == 404 || statusCode == 500)
                return false;
            return true;
        };
        this.checkContentType = (headers) => {
            if (headers === undefined)
                return false;
            let data = headers["content-type"].split(";");
            if (data[0] == "application/json")
                return true;
            return false;
        };
    }
    async get(url) {
        let result;
        let error;
        let isError;
        return new Promise((resolve, reject) => {
            http_1.default.get(url, resp => {
                let data = "";
                if (!this.checkStatus(resp.statusCode)) {
                    error.push(resp.statusMessage);
                    isError = true;
                }
                if (!this.checkContentType(resp.headers)) {
                    error.push("Incorrect header!");
                    isError = true;
                }
                resp.on("data", chunk => {
                    data += chunk;
                });
                resp.on("end", () => {
                    if (!isError) {
                        result = JSON.parse(data);
                        resolve(result);
                    }
                    else {
                        reject(error);
                    }
                });
            });
        });
    }
    async post(url, data) {
        let error;
        let isError;
        return new Promise((resolve, reject) => {
            let rawData = "";
            let result = "";
            rawData = JSON.stringify(data);
            const options = {
                hostname: 'localhost',
                port: 3000,
                path: url,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Content-Length': rawData.length
                }
            };
            const req = http_1.default.request(options, resp => {
                resp.on('data', chunk => result += chunk);
                console.log(rawData);
                resp.on('error', reject);
                resp.on("end", () => {
                    resp.statusCode === 200
                        ? resolve(result)
                        : reject(result);
                });
            });
            if (!isError) {
                req.write(rawData);
                req.end();
            }
            else {
                reject(error);
            }
        });
    }
}
exports.default = Wrapper;
