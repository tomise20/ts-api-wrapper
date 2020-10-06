"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
http_1.default.get("http://localhost:3000/test", resp => {
    let data = "";
    //A chunk of data has been recived.
    resp.on("data", chunk => {
        data += chunk;
    });
    //the whole response has been recived. Print out the result.
    resp.on("end", () => {
        let url = JSON.parse(data).title;
        console.log(url);
    });
})
    .on("error", err => {
    console.log("Error: " + err.message);
});
