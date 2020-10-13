"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
class Tosix {
    constructor() {
        this.checkContentType = (headers) => {
            if (headers === undefined)
                return false;
            let data = headers["content-type"].split(";");
            if (data[0] !== "application/json")
                return false;
            return true;
        };
    }
    async get(url) {
        let result;
        let error;
        let isError;
        return new Promise((resolve, reject) => {
            http_1.default.get(url, res => {
                let data = "";
                if (res.statusCode !== 200) {
                    error.push(res.statusMessage);
                    isError = true;
                }
                if (!this.checkContentType(res.headers)) {
                    error.push("Incorrect header!");
                    isError = true;
                }
                res.on("data", chunk => {
                    data += chunk;
                });
                res.on("end", () => {
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
    async post(url, rawData) {
        let error = {
            messages: []
        };
        let isError;
        return new Promise((resolve, reject) => {
            const options = {
                hostname: 'localhost',
                port: 3000,
                path: url,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            const request = http_1.default.request(options, (res) => {
                if (res.statusCode !== 201) {
                    isError = true;
                    error.messages.push('error occurred!');
                }
                if (!this.checkContentType(res.headers)) {
                    isError = true;
                    error.messages.push('cannot handle the data provided!');
                }
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk.toString('utf8');
                    try {
                        JSON.parse(data);
                    }
                    catch (ex) {
                        isError = true;
                        error.messages.push("content was not valid json");
                    }
                });
                res.on('end', () => {
                    if (isError) {
                        reject(error);
                    }
                    else {
                        resolve({
                            code: 201,
                            data: JSON.parse(data)
                        });
                    }
                });
            });
            request.write(JSON.stringify(rawData), () => {
                console.log('data has been written!');
            });
            request.end();
        });
    }
}
exports.default = Tosix;
