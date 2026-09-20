import { Client, Account, Databases, Storage } from 'appwrite';

export const client = new Client();
client
    .setEndpoint('https://sgp.cloud.appwrite.io/v1') 
    .setProject('6aafa1220006333a89f7');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
