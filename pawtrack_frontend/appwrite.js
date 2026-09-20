import { Client, Account, Databases, Storage } from 'appwrite';

export const client = new Client();
client
    .setEndpoint('https://sgp.cloud.appwrite.io/v1') 
    .setProject('6aae916e003d2c507761');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
