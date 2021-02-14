import firebase from "./configFirebase";
const db = firebase.firestore();

export const getCollection = async (collection) => {
  let result = { statusResponse: false, data: null, error: null };
  try {
    const data = await db.collection(collection).get();
    const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    result.data = arrayData;
    result.statusResponse = true;
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const addDocument = async (collection, data) => {
  let result = { statusResponse: false, data: null, error: null };
  try {
    const dataResponse = await db.collection(collection).add(data);
    result.data = { id: dataResponse.id, ...data };
    result.statusResponse = true;
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const getDocument = async (collection, id) => {
  let result = { statusResponse: false, data: null, error: null };
  try {
    const dataResponse = await db.collection(collection).doc(id).get();
    result.data = { id, ...dataResponse.data() };
    result.statusResponse = true;
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const updateDocument = async (collection, id, data) => {
  let result = { statusResponse: false, error: null };
  try {
    await db.collection(collection).doc(id).update(data);
    result.statusResponse = true;
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const deleteCollection = async (collection, id) => {
  let result = { statusResponse: false, data: null, error: null };
  try {
    await db.collection(collection).doc(id).delete();
    result.statusResponse = true;
  } catch (error) {
    result.error = error;
  }
  return result;
};
