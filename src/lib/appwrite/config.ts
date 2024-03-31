import { Client, Account, Databases, Storage, Avatars } from 'appwrite'

const appwriteConfig = {
    url: import.meta.env.VITE_APPWRITE_URL,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    sharedCollectionId: import.meta.env.VITE_APPWRITE_SHARED_COLLECTION_ID,
    usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    postsCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID
}

const client = new Client()
client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)

const account = new Account(client)
const databases = new Databases(client)
const storage = new Storage(client)
const avatars = new Avatars(client)

export {
    appwriteConfig,
    client,
    account,
    databases,
    storage,
    avatars
}