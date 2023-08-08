import { z } from 'zod';

export const loginValidator = {
    body: z.object({
        email: z.string().email(),
        password: z.string()
    })
};

export const registrationValidator = {
    body: z.object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string().email(),
        password: z.string()
    })
};
