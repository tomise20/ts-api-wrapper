import http from "http";

class Wrapper {

  get(url: string): any {
    let request = http.get(url, resp => {
      let data: string = "";

      if(!this.checkStatus(resp.statusCode)) {
        console.log(resp.statusMessage);
        return resp.statusMessage;
      }
    
      resp.on("data", chunk => {
        data += chunk;
      });
    
      resp.on("end", () => {
        
        if(!this.checkContentType(resp.headers)) {
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

  checkStatus = (statusCode: (number | undefined)): boolean => {

    if(statusCode == 403 || statusCode == 404 || statusCode == 500)
      return false;

    return true;
  }

  checkContentType = (headers: any): boolean => {
  
    if(headers === undefined)
      return false;

    let data: string[] = headers["content-type"].split(";");

    if(data[0] == "application/json")
      return true;

    return false;
  }
}

export default Wrapper;