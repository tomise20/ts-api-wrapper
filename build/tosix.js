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
        let error = {
            messages: [],
        };
        let isError;
        return new Promise((resolve, reject) => {
            http_1.default.get(url, (res) => {
                if (res.statusCode !== 200) {
                    error.messages.push(res.statusMessage);
                    isError = true;
                }
                if (!this.checkContentType(res.headers)) {
                    error.messages.push("Incorrect header!");
                    isError = true;
                }
                let data;
                let rawData = "";
                res.on("data", (chunk) => {
                    rawData += chunk.toString("utf8");
                    try {
                        data = JSON.parse(rawData);
                    }
                    catch (ex) {
                        isError = true;
                        error.messages.push("content was not valid json");
                    }
                });
                res.on("end", () => {
                    if (!isError) {
                        resolve({
                            statusCode: res.statusCode,
                            data: data.data,
                        });
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
            messages: [],
        };
        let isError;
        return new Promise((resolve, reject) => {
            const options = {
                hostname: "localhost",
                port: 3000,
                path: url,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const request = http_1.default.request(options, (res) => {
                if (res.statusCode !== 201 && res.statusCode !== 200) {
                    isError = true;
                    error.messages.push(res.statusMessage);
                }
                if (!this.checkContentType(res.headers)) {
                    isError = true;
                    error.messages.push("cannot handle the data provided!");
                }
                let data;
                let rawData = "";
                res.on("data", (chunk) => {
                    rawData += chunk.toString("utf8");
                    try {
                        data = JSON.parse(rawData);
                    }
                    catch (ex) {
                        isError = true;
                        error.messages.push("content was not valid json");
                    }
                });
                res.on("end", () => {
                    if (isError) {
                        reject(error);
                    }
                    else {
                        resolve({
                            statusCode: res.statusCode,
                            data: data.data,
                        });
                    }
                });
            });
            request.write(JSON.stringify(rawData), () => {
                console.log("data has been written!");
            });
            request.end();
        });
    }
    /* async put(url: string, rawData: Object): Promise<HttpResponse> {
        let error: HttpError = {
            messages: [],
        };
        let isError: boolean;

        return new Promise((resolve, reject) => {
            const options: RequestOptions = {
                hostname: "localhost",
                port: 3000,
                path: url,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const request = http.request(options, (res: IncomingMessage) => {
                if (res.statusCode !== 201 && res.statusCode !== 200) {
                    isError = true;
                    error.messages.push(<string>res.statusMessage);
                }

                if (!this.checkContentType(res.headers)) {
                    isError = true;
                    error.messages.push("cannot handle the data provided!");
                }

                let data: ServerResponse;
                let rawData: string = "";
                res.on("data", (chunk) => {
                    rawData += chunk.toString("utf8");
                    try {
                        data = JSON.parse(rawData);
                    } catch (ex) {
                        isError = true;
                        error.messages.push("content was not valid json");
                    }
                });

                res.on("end", () => {
                    if (isError) {
                        reject(error);
                    } else {
                        resolve({
                            statusCode: <number>res.statusCode,
                            data: data.data,
                        });
                    }
                });
            });

            request.write(JSON.stringify(rawData), () => {
                console.log("data has been written!");
            });

            request.end();
        });
    } */
    async delete(url) {
        let error = {
            messages: [],
        };
        let isError;
        return new Promise((resolve, reject) => {
            const options = {
                hostname: "localhost",
                port: 3000,
                path: url,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const request = http_1.default.request(options, (res) => {
                if (res.statusCode !== 200) {
                    isError = true;
                    error.messages.push(res.statusMessage);
                }
                if (!this.checkContentType(res.headers)) {
                    isError = true;
                    error.messages.push("cannot handle the data provided!");
                }
                let data;
                let rawData = "";
                res.on("data", (chunk) => {
                    rawData += chunk.toString("utf8");
                    try {
                        data = JSON.parse(rawData);
                    }
                    catch (ex) {
                        isError = true;
                        error.messages.push("content was not valid json");
                    }
                });
                res.on("end", () => {
                    if (isError) {
                        reject(error);
                    }
                    else {
                        resolve({
                            statusCode: res.statusCode,
                            data: data.data,
                            message: data.message,
                        });
                    }
                });
            });
            request.end();
        });
    }
}
exports.default = Tosix;
