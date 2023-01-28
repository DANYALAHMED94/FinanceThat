// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import app from 'firebase/app'

export default app.initializeApp({
    apiKey: process.env.REACT_APP_CHAT_API_KEY,
    authDomain: process.env.REACT_APP_CHAT_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_CHAT_URL,
    projectId: process.env.REACT_APP_CHAT_PROJECT_ID,
    storageBucket: process.env.REACT_APP_CHAT_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_CHAT_MESSAGING_ID,
    appId: process.env.REACT_APP_CHAT_APP_ID,
    measurementId: process.env.REACT_APP_CHAT_MEASURMENT_ID

})