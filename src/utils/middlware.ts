import { jwt_decode, jwt_verify } from '~/utils/encryption.ts';
const public_routes = ['/authorization', '/playground', '/webhook', '/apps', '/public', '/kv-sync'];

export const checkLogin = async (c: any, next: any) => {
    let authorized = false;
    const { pathname } = new URL(c.req.url);
    if (public_routes.some((r) => pathname.startsWith(r))) return next();
    const token = c.req.header('Authorization') || c.req.query('token');
    if (token) {
        try {
            const verify = await jwt_verify(token);
            if (verify) {
                const payload = jwt_decode(token);
                if (payload?.id) {
                    c.set('user', payload);
                    authorized = true;
                }
            }
        } catch (e: any) {
            // eslint-disable-next-line
            console.error(e);
        }
    }
    return authorized ? next() : c.text('Login Required', 401);
};
