import { Client, Databases } from 'node-appwrite';

const client = new Client()
    .setEndpoint('https://sgp.cloud.appwrite.io/v1') 
    .setProject('6aae916e003d2c507761')
    .setKey('YOUR_API_KEY_HERE'); // We need an API key to run this

const databases = new Databases(client);

// ... wait, requiring an API key makes this complicated for the user.
