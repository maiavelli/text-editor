import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// PUT FUNCTION
export const putDb = async (content) => {
  // create connection to DB
  const jateDB = await openDB('jate', 1);

  // create a new transaction and specify DB and data privileges
  const tx = jateDB.transaction('jate', 'readwrite');

  // open up desired store object 
  const store = tx.objectStore('jate');

  // put content to store 
  const request = store.put({ jate: content });

  const result = await request;
  console.log('Data successfully saved to database', result)
};

// TODO: Add logic for a method that gets all the content from the database
// GET FUNCTION 
export const getDb = async () => {
  // create connection to DB
  const jateDB = await openDB('jate', 1);

  // create a new transaction, specify DB, and readonly privileges
  const tx = jateDB.transaction('jate', 'readonly');

  // open store object
  const store = tx.objectStore('jate');

  // get all data in DB
  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);

  return result?.value;
};

initdb();
