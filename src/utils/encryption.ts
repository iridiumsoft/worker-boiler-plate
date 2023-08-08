import jwt from '@tsndr/cloudflare-worker-jwt';

const algo = {
    name: 'AES-GCM',
    length: 256,
    iv: new Int8Array([5, 12, 14, 5, 12, 14, 14, 5, 12, 14, 10, 11])
};

const base64Encode = async (buf: ArrayBuffer): Promise<string> => {
    if (globalThis.env.PLATFORM === 'worker') {
        // @ts-ignore: worker has Buffer
        return Buffer.from(buf).toString('base64');
    } else {
        // @ts-ignore: deno is off
        const { encode } = await import('https://deno.land/std@0.166.0/encoding/base64.ts');
        return encode(buf);
    }
};

const base64Decode = async (text: string) => {
    if (globalThis.env.PLATFORM === 'worker') {
        // @ts-ignore: worker has Buffer
        const str2ab = (await import('string-to-arraybuffer')).default;
        return str2ab(text);
    } else {
        // @ts-ignore: deno is off
        const { decode } = await import('https://deno.land/std@0.166.0/encoding/base64.ts');
        return decode(text);
    }
};

// Encrypt Function
export const encrypt = async (text: string, secreteKey?: string): Promise<string> => {
    text = text.toString();
    const key = await genEncryptionKey(secreteKey || globalThis.env.ENCRYPTION_SECRET_KEY);
    const buf = await crypto.subtle.encrypt(algo, key, new TextEncoder().encode(text));
    return await base64Encode(buf);
};

export const decrypt = async (cipherText: string): Promise<string> => {
    try {
        const cipher = await base64Decode(cipherText);
        const key = await genEncryptionKey(globalThis.env.ENCRYPTION_SECRET_KEY);
        const decrypted = await crypto.subtle.decrypt(algo, key, cipher);
        return new TextDecoder().decode(decrypted);
    } catch (_error) {
        return '';
    }
};

// Generate key from password
const key_algo = {
    name: 'PBKDF2',
    hash: 'SHA-256',
    salt: new TextEncoder().encode('a-unique-salt'),
    iterations: 10
};

async function genEncryptionKey(password: string) {
    const encoded = new TextEncoder().encode(password);
    const key = await crypto.subtle.importKey('raw', encoded, { name: 'PBKDF2' }, false, ['deriveKey']);
    return crypto.subtle.deriveKey(key_algo, key, { name: algo.name, length: algo.length }, false, ['encrypt', 'decrypt']);
}

export const jwt_encode = (data: Dictionary<any>, expiry = 86400) => {
    // by default expiry is 1 day
    const exp = Math.floor(Date.now() / 1000) + expiry;
    return jwt.sign({ exp, ...data }, globalThis.env.ENCRYPTION_SECRET_KEY);
};

export const jwt_verify = (token: string) => jwt.verify(token, globalThis.env.ENCRYPTION_SECRET_KEY);

export const jwt_decode = (token: string) => {
    const decoded = jwt.decode(token);
    return decoded.payload || {};
};
