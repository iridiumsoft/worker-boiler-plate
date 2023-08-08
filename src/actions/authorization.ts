import SendError from "~/error_handler.ts";
import { decrypt, jwt_encode } from "~/utils/encryption.ts";

export const login = async (email: String, password: String) => {
    // check username and password from database
    const user = await globalThis.env.DB.selectFrom("users").limit(1).selectAll().executeTakeFirst();
    if(!user) throw new SendError("Invalid email or password", 401);
    const decrypted_password = await decrypt(user.password);
    if (password !== decrypted_password) throw new SendError("Invalid email or password", 401);
    return { token: await jwt_encode(user), user }
}
