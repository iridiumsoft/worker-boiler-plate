export {};

declare global {

    type Env = {
        PLATFORM: 'worker' | 'deno' | 'nodejs',
        ENCRYPTION_SECRET_KEY: string
    }

    type CurrentUser = {
        id: number,
        first_name: string,
        last_name: string,
        email: string,
        photo: string,
    }

    type HonoContext = {
        Bindings: Env,
        Variables: {
            user: CurrentUser
        }
    }

    var Env = Env

    type Dictionary<T> = Record<string, T>
}
