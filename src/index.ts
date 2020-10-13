import { HttpError } from './interfaces/HttpError';
import { HttpResponse } from './interfaces/HttpResponse';
import Tosix from './tosix';

const tosix = new Tosix();

/* tosix.get("http://dummy.restapiexample.com/api/v1/employees")
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log("Error: " + error);
    }); */

let body: any = "Test";

tosix.post("/test", body)
    .then((res: HttpResponse) => {
        console.log(res.data);
    })
    .catch((error: HttpError) => {
        console.log("Error: " + error.messages[0]);
    });