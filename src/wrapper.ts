import http from "http";


http.get("http://localhost:3000/test", resp => {
  let data: string = "";

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