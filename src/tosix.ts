import http, { IncomingMessage } from "http";
import {RequestOptions} from 'https';
import { HttpError } from "./interfaces/HttpError";
import { HttpResponse } from "./interfaces/HttpResponse";
import { ServerResponse } from "./interfaces/ServerResponse";

class Tosix {

  async get(url: string): Promise<HttpResponse> {
    let error: HttpError = {
        messages: []
    };
    let isError: boolean;

    return new Promise((resolve, reject) => {
      http.get(url, res => {
        
        if(res.statusCode !== 200) {
            error.messages.push(<string>res.statusMessage);
            isError = true;
        }

        if(!this.checkContentType(res.headers)) {
            error.messages.push("Incorrect header!");
            isError = true;
        }

        let data: ServerResponse;
        let rawData = "";
        res.on('data', (chunk) => {

            rawData += chunk.toString('utf8');
            try {
                data = JSON.parse(rawData);
            } catch (ex) {
                isError = true;
                error.messages.push("content was not valid json");
            }
        });

        res.on("end", () => {
            if(!isError) {
                resolve({
                    statusCode: <number>res.statusCode,
                    data: data.data
                });
            } else {
                reject(error);
            }
        });
      });
    });
  }

  async post(url: string, rawData: Object): Promise<HttpResponse> {
    let error: HttpError = {
        messages: []
    };
    let isError: boolean;

    return new Promise((resolve, reject) => {
        const options: RequestOptions = {
            hostname: 'localhost',
            port: 3000,
            path: url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const request = http.request(options, (res: IncomingMessage) => {
            
        if(res.statusCode !== 201) {
            isError = true;
            error.messages.push('error occurred!')
        }

        if(!this.checkContentType(res.headers)) {
            isError = true;
            error.messages.push('cannot handle the data provided!')
        }

        let data: ServerResponse;
        let rawData = "";
        res.on('data', (chunk) => {

            rawData += chunk.toString('utf8');
            try {
                data = JSON.parse(rawData);
            } catch (ex) {
                isError = true;
                error.messages.push("content was not valid json");
            }
        });

        res.on('end', () => {
            if(isError) {
                reject(error);
            } else {
                resolve({
                    statusCode: <number>res.statusCode,
                    data: data.data
                });
            }
        });
            
        });

        request.write(JSON.stringify(rawData), () => {
            console.log('data has been written!');
        });

        request.end();
    });
  }

  async delete(url: string): Promise<HttpResponse> {
    let error: HttpError = {
        messages: []
    };
    let isError: boolean;

    return new Promise((resolve, reject) => {
        const options: RequestOptions = {
            hostname: 'localhost',
            port: 3000,
            path: url,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const request = http.request(options, (res: IncomingMessage) => {
            
        if(res.statusCode !== 200) {
            isError = true;
            error.messages.push('error occurred!')
        }

        if(!this.checkContentType(res.headers)) {
            isError = true;
            error.messages.push('cannot handle the data provided!')
        }

        let data: ServerResponse;
        let rawData = "";
        res.on('data', (chunk) => {

            rawData += chunk.toString('utf8');
            try {
                data = JSON.parse(rawData);
            } catch (ex) {
                isError = true;
                error.messages.push("content was not valid json");
            }
        });

        res.on('end', () => {
            if(isError) {
                reject(error);
            } else {
                resolve({
                    statusCode: <number>res.statusCode,
                    data: data.data
                });
            }
        });
            
        });

        request.end();
    });
  }

  checkContentType = (headers: any): boolean => {
  
    if(headers === undefined)
      return false;

    let data: string[] = headers["content-type"].split(";");

    if(data[0] !== "application/json")
      return false;

    return true;
  }
}

export default Tosix;