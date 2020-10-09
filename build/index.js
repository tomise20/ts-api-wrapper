"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wrapper_1 = __importDefault(require("./wrapper"));
const wrapper = new wrapper_1.default();
/* wrapper.get("http://dummy.restapiexample.com/api/v1/employees")
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log("Error: " + error);
    }); */
let data = { title: "test" };
wrapper.post("/test", data)
    .then(data => {
    console.log("Válasz: ");
    console.log(data);
})
    .catch(error => {
    console.log("Error: " + error[0]);
});
