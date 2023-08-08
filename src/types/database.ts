import type { Generated, Insertable, Selectable, Updateable } from 'kysely';

interface UsersTable {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    status: 'active' | 'inactive'
}

export type Users = Selectable<UsersTable>;
export type UsersInsertable = Insertable<UsersTable>;
export type UsersUpdatable = Updateable<UsersTable>;

export default interface Database {
    users: UsersTable
}
