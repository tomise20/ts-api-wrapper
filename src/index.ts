import { HttpError } from "./interfaces/HttpError";
import { HttpResponse } from "./interfaces/HttpResponse";
import Tosix from "./tosix";

const tosix = new Tosix();

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
	.then((res: HttpResponse) => {
		console.log(res);
	})
	.catch((error: HttpError) => {
		console.log("Error: " + error.messages[0]);
	});
