import React, { useContext, useState, useEffect } from "react"
import { firestore } from "../firebase"

firestore.settings({timestampsInSnapshots:true});

const FirestoreContext = React.createContext()

export function useFirestore() {
  return useContext(FirestoreContext)
}

export function FirestoreProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  // const [currentFirestore,setCurrentFirestore]

  function getCollectionData(userId){
    return firestore.collection('userData').doc(userId)
}

function addCollectionData(userDetails,userId){
  return firestore.collection('userData').doc(userId).add(userDetails)
}

function deleteCollectionData(docId){
  return firestore.collection('userData').doc(docId).delete()
}

function createUserData(userId,secQuestionData){
  return firestore.collection('users').doc(userId).set(
      secQuestionData
  )
}

//   useEffect(() => {
//         getCollectionData().then(snapshot=>{
//           console.log(snapshot.docs)
//       })
//       setLoading(false)
//   }, []);


  const value = {
    getCollectionData,
    addCollectionData,
    deleteCollectionData,
    createUserData
  };
  return (
    <FirestoreContext.Provider value={value}>
        { children}
    </FirestoreContext.Provider>)
}
