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
    get(url) {
        let request = http_1.default.get(url, resp => {
            let data = "";
            if (!this.checkStatus(resp.statusCode)) {
                console.log(resp.statusMessage);
                return resp.statusMessage;
            }
            resp.on("data", chunk => {
                data += chunk;
            });
            resp.on("end", () => {
                if (!this.checkContentType(resp.headers)) {
                    console.log("Incorrect header!");
                    return false;
                }
                let url = JSON.parse(data).title;
                console.log(url);
                return true;
            });
            return "success";
        })
            .on("error", err => {
            console.log("Error: " + err.message);
        });
        request.end();
    }
}
exports.default = Wrapper;
