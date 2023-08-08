import Database from "~/types/database.ts";
import { Kysely } from 'kysely';

export {};

declare global {

    type Env = {
        DB: Kysely<Database>,
        Context: ExecutionContext;

        PLATFORM: 'worker' | 'deno' | 'nodejs',
        ENCRYPTION_SECRET_KEY: string,
        ENV: 'dev' | 'production',
        DATABASE_URL: string,
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
