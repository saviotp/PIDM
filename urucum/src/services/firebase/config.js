// Configuração do Firebase usando o SDK modular
// Para usar o Realtime Database, precisamos instalar o pacote 'firebase'
// Execute: npm install firebase

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, update, remove, query, orderByChild, equalTo, onValue } from 'firebase/database';

// Configuração do Firebase (baseada no google-services.json)
const firebaseConfig = {
    apiKey: "AIzaSyCvhlG0B3xZpMe-4FK9Kifgmi-RmgRhs1k",
    authDomain: "urucum-react-native-project.firebaseapp.com",
    databaseURL: "https://urucum-react-native-project-default-rtdb.firebaseio.com",
    projectId: "urucum-react-native-project",
    storageBucket: "urucum-react-native-project.firebasestorage.app",
    messagingSenderId: "278867216585",
    appId: "1:278867216585:android:50f486e95560cc0e336518"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Referência ao Realtime Database
const database = getDatabase(app);

export { app, database, ref, set, get, update, remove, query, orderByChild, equalTo, onValue };
