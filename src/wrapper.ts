import http from "http";

class Wrapper {

  async get(url: string): Promise<Object | string[]> {
    let result: Object[];
    let error: string[];
    let isError: boolean;

    return new Promise((resolve, reject) => {
      http.get(url, resp => {
        let data: string = "";
        
        if(!this.checkStatus(resp.statusCode)) {
            error.push(<string>resp.statusMessage);
            isError = true;
        }

        if(!this.checkContentType(resp.headers)) {
            error.push("Incorrect header!");
            isError = true;
        }

        resp.on("data", chunk => {
            data += chunk;
        });

        resp.on("end", () => {
            if(!isError) {
                result = JSON.parse(data);
                resolve(result);
            } else {
                reject(error);
            }
        });
      });
    });
  }

  async post(url: string, data: Object): Promise<String | string[]> {
    let error: string[];
    let isError: boolean;

    return new Promise((resolve, reject) => {
        let rawData: string = "";
        let result: string = "";
        rawData = JSON.stringify(data);

        const options = {
            hostname: 'localhost',
            port: 3000,
            path: url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': rawData.length
            }
        }

        const req = http.request(options, resp => {

            resp.on('data', chunk => result += chunk);

            resp.on('error', reject);

            resp.on("end", () => {
                resp.statusCode === 200
                ? resolve(result)
                : reject(result)
            });
        });

        if(!isError) {
            req.write(rawData);
            req.end();
        } else {
            reject(error);
        }
    });
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