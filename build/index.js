"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tosix_1 = __importDefault(require("./tosix"));
const tosix = new tosix_1.default();
/* tosix
    .get("http://dummy.restapiexample.com/api/v1/employees")
    .then((data) => {
        console.log(data.data);
    })
    .catch((error) => {
        console.log("Error: " + error);
    }); */
/* let body: Object = {
    name: "test",
    salary: "123",
    age: "23",
}; */
/* tosix.post("http://dummy.restapiexample.com/api/v1/create", body)
    .then((res: HttpResponse) => {
        console.log(res.data);
    })
    .catch((error: HttpError) => {
        console.log("Error: " + error.messages[0]);
    }); */
tosix
    .delete("http://localhost:3000/delete/2")
    .then((res) => {
    console.log(res);
})
    .catch((error) => {
    console.log("Error: " + error.messages[0]);
});
