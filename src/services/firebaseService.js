import { firebaseDatabase } from "../utils/firebaseUtils"

export default class FirebaseService {
  static getDataList = (nodePath, callback, size = 10) => {
    const query = firebaseDatabase.ref(nodePath).limitToLast(size)
    query.on("value", (dataSnapshot) => {
      const items = []

      dataSnapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val()
        item.key = childSnapshot.key
        items.push(item)
      })

      callback(items)
    })

    return query
  }

  static getUniqueDataBy = (node, id, callback) => {
    const ref = firebaseDatabase.ref(`${node}/${id}`)
    const newData = {}
    ref
      .once("value", (dataSnapshot) => {
        if (
          !dataSnapshot ||
          dataSnapshot === undefined ||
          !dataSnapshot.val() ||
          dataSnapshot.val() === undefined
        ) {
          callback(null)
          return
        }

        const snap = dataSnapshot.val()
        const keys = Object.keys(snap)
        keys.forEach((key) => {
          newData[key] = snap[key]
        })
      })
      .then(() => {
        callback(newData)
      })
  }

  static getReceitas = async (callback) => {
    const query = firebaseDatabase.ref("receitas")
    const snapshot = await query.once("value")
    const items = []
    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val()
      item.key = childSnapshot.key
      items.push(item)
    })

    callback(items)

    return query
  }

  static pushData = (node, objToSubmit) => {
    const ref = firebaseDatabase.ref(node).push()
    const id = firebaseDatabase.ref(node).push().key
    ref.set(objToSubmit)
    return id
  }
}
