"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tosix_1 = __importDefault(require("./tosix"));
const tosix = new tosix_1.default();
/* tosix.get("http://dummy.restapiexample.com/api/v1/employees")
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log("Error: " + error);
    }); */
let body = "Test";
tosix.post("/test", body)
    .then((res) => {
    console.log(res.data);
})
    .catch((error) => {
    console.log("Error: " + error.messages[0]);
});
