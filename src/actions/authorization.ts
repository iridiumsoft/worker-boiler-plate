import SendError from "~/error_handler.ts";

interface LoginResponse {
    token: string,
    user: CurrentUser
}

export const login = async (email: String, password: String): Promise<LoginResponse>=> {
    // check username and password from database
    let is_login = false;
    if(!is_login) throw new SendError("Invalid email or password", 401);

    // create token
   return {
       // use generateToken function
        token: "",
        user: {
            id: 1,
            first_name: "",
            last_name: "",
            email: "",
            photo: ""
        }
    } as LoginResponse;
}
