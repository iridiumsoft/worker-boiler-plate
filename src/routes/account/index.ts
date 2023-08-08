import app from '~/app.ts';
import {checkLogin} from "~/utils/middlware.ts";

const router = app.basePath('/account');

router.get('/', checkLogin, async (c)=> {
    const user = c.get('user');
    c.text(user.first_name, 200);
});
