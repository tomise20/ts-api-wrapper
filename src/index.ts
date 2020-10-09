import Wrapper from './wrapper';

const wrapper = new Wrapper();

/* wrapper.get("http://dummy.restapiexample.com/api/v1/employees")
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log("Error: " + error);
    }); */

let data: Object = {title: "test"};

wrapper.post("/test", data)
    .then(data => {
        console.log("Válasz: ");
        console.log(data);
    })
    .catch(error => {
        console.log("Error: " + error[0]);
    });