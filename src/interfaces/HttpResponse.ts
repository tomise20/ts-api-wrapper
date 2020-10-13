import { HttpError } from "./HttpError";

export interface HttpResponse {
    statusCode: number,
    data: Object
}