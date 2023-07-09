import {initializeApp} from 'firebase/app'
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider,
  createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut,onAuthStateChanged} from 'firebase/auth'
import {getFirestore, doc, getDoc,setDoc,collection,writeBatch, query, getDocs} from 'firebase/firestore'

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAK7EDMDC6rhhoNcEGLs8SsQZqGtuw5xCc",
    authDomain: "webshop-clothing-db.firebaseapp.com",
    projectId: "webshop-clothing-db",
    storageBucket: "webshop-clothing-db.appspot.com",
    messagingSenderId: "247383754132",
    appId: "1:247383754132:web:ef17a8751db51a2aecfb81"
  };
  
  
  // Initialize Firebase
  
  const app = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider()
  googleProvider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth()
  export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider)
  export const signInWithGoogleRedirect = () => signInWithGoogleRedirect(auth,googleProvider)

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
      const {title, items} = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    },{})

    return categoryMap;

  }
  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db,collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach(object => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object)
    })
    await batch.commit();
    console.log('Done');
  }

  export const db = getFirestore()
  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    // IF user does not exist
    if (!userSnapshot.exists()) {
      const {displayName,email} = userAuth
      const createAt = new Date()
      
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createAt,
          ...additionalInformation
        })
      } catch(error) {
        console.log('Error creating the user', error.message)
      }
    }

    //Create/set the document with the data from userAuth from my collection
    //If user data exists

    return userDocRef
  }

  export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if (!email || !password) return
    return await createUserWithEmailAndPassword(auth,email,password)
  }

  export const signAutInWithEmailAndPassword = async (email,password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
  }

  export const  signOutUser = async  () =>  await signOut(auth);

  export const onAuthStateChangedListener =  (callback) => onAuthStateChanged(auth,callback)