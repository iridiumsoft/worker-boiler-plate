import {StatusCode} from "hono/dist/types/utils/http-status";
import { Context } from "hono";

export default class SendError extends Error {
    code: StatusCode;

    constructor(message: string, code: StatusCode) {
        super(message);
        this.code = code;
    }
}

export const errorHandler = (err: any, ctx: Context<HonoContext, any, {}>) => {
    console.log(err);
    const errorMessage = err.cause || err?.message || err;
    let errorCode: StatusCode = typeof err.code !== 'number' ? 500 : err.code;
    if (errorCode < 200 || errorCode > 599) errorCode = 500;
    return ctx.json([errorMessage], errorCode);
};
