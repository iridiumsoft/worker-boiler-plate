import { Hono } from 'hono';
import { cors } from 'hono/cors';
import {errorHandler} from "./error_handler";

const app = new Hono<HonoContext>();

const ALLOWED_ORIGINS = {
    localhost: 1,
    '0.0.0.0': 1,
    '127.0.0.1': 1,
    placeholder: 1
};

app.onError((err, context) => errorHandler(err, context as any));
app.use('*', cors(), async (c, next) => {
    const { hostname } = new URL(c.req.url);
    if (!ALLOWED_ORIGINS[hostname as keyof typeof ALLOWED_ORIGINS]) return c.text('Not allowed: ' + hostname, 403);
    c.res.headers.set('Access-Control-Allow-Origin', '*');
    c.res.headers.set('Access-Control-Max-Age', c.req.method === 'OPTIONS' ? '86400' : '0');
    c.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type, baggage, sentry-trace, Authorization');
    return c.req.method === 'OPTIONS' ? c.text('', 200) : await next();
});

app.get('/', (c)=> {
    return c.text("Hono with Cloudflare Worker");
})

export default app;
