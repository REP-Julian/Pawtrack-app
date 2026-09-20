import { Client, Databases } from 'node-appwrite';

const client = new Client()
    .setEndpoint('https://sgp.cloud.appwrite.io/v1') 
    .setProject('6aafa1220006333a89f7')
    .setKey('YOUR_API_KEY_HERE'); // We need an API key to run this

const databases = new Databases(client);

// ... wait, requiring an API key makes this complicated for the user.
