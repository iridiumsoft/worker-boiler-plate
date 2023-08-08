import app from '~/app.ts';
import {loginValidator, registrationValidator} from "~/routes/authorization/validators.ts";
import { zValidator } from '@hono/zod-validator';
import { login } from "~/actions/authorization.ts";

const router = app.basePath('/authorization');
// every router added with basePath will use basePath value as prefix
// so the route will be /authorization/login
// look at Honojs documentation for example

router.post('/login', zValidator('json', loginValidator.body), async (c)=> {
    let {email, password} = c.req.valid("json");
    let response = await login(email, password);
    return c.json(response);
});

router.post('/register', zValidator('json', registrationValidator.body), async(c)=> {
    let { first_name, last_name, email, password } = c.req.valid('json');
    // use user information to register new account
});

router.post('/forgot-password', async(c)=> {

});
