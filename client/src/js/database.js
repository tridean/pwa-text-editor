/*
  The idb package being required below provides some syntactic sugar around the methods needed to work with IndexedDB. Yes, the code you see below is actually a "prettier" version of what you would normally have to write. Be thankful. We've only been using the idb package since mid 2022. Before that students had to write this code with no helper methods. These students deserve a medal.
*/
import { openDB } from 'idb';

// We will define a global constant for our database name so we don't mess it up anywhere
const DB_NAME = "jate";

const initdb = async () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_NAME)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(DB_NAME, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

/*
  We need to add some code below which will take updated content and save it to IndexedDB.
*/
export const putDb = async (content) => {
  // First, create a variable, and set it to asynchronously await the opening of the database.
  const db = await openDB(DB_NAME, 1);

  // Now create a variable for the transaction.
  const tx = db.transaction(DB_NAME, 'readwrite');

  // Now create a variable for the store.
  const store = tx.objectStore(DB_NAME);

  const request = store.put({ id: 1, value: content });
  await request; // Wait for the request to complete.

  console.log('🚀 - data saved to the database', content);
};

/*
  We need to add some code below which will get all content from IndexedDB.
*/
export const getDb = async () => {
  // Create a variable, and set it to asynchronously await the opening of the database.
  const db = await openDB(DB_NAME, 1);

  // Create a variable for the transaction; this one will be 'readonly'.
  const tx = db.transaction(DB_NAME, 'readonly');

  // Create a variable for the store.
  const store = tx.objectStore(DB_NAME);

  const request = store.get(1);
  const result = await request;

  if (result) {
    console.log('🚀 - data retrieved from the database', result.value);
    return result.value;
  } else {
    console.log('🚀 - data not found in the database');
    return null;
  }
};

initdb();
