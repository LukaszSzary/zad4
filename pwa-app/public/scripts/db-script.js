const BooksDB = {
    addToDB: null,
    getAll: null,
    ready: false
};

const dbName = 'BooksDB';
const dbVersion = 2;
const request = indexedDB.open(dbName, dbVersion);

const newsObjectStoreKey = 'Books';
request.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains(newsObjectStoreKey)) {
        db.createObjectStore(newsObjectStoreKey, {keyPath: 'id', autoIncrement: true });
        console.log("db.createObjectStore: DONE");
    }
};

request.onsuccess = (event) => {
    const db = event.target.result;
    BooksDB.addToDB = (news) => {
        console.log(`adding to db${news}`);
        const transactionType = 'readwrite';
        const store = db.transaction(newsObjectStoreKey, transactionType).objectStore(newsObjectStoreKey);
        store.add(news);        
    }

    BooksDB.getAll = () => {
        return new Promise((resolve, reject) => {
        const transactionType = 'readonly';
        const transaction = db.transaction(newsObjectStoreKey, transactionType);
        const store = transaction.objectStore(newsObjectStoreKey);
        const request = store.getAll();
            
        request.onsuccess = () => resolve(request.result);
        request.onerror = (err) => reject(err);
        });
    }    
    BooksDB.ready = true;
     console.log("Database initialized");
};