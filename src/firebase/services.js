  import { db } from "./config";
  
  const collectionName = "usuarios";

  export const obtenerDatos = async () => {
    try {
        let dato = await db.collection(collectionName).get();
        dato = await db.collection(collectionName).get();
        const docs = [];
        dato.forEach((doc) => {
          docs.push({...doc.data(), id: doc.id});
          console.log(doc.data());
        });
        return docs;
    } catch (err) {
      console.log(err);
    }
  };

  export const eliminarDatos = async (id) => {
    try {
      await db.collection(collectionName).doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  };

  export const guardarDatos = async (registro) => {
    const newUser = {nombre: registro.nombre, apellido: registro.apellido};
    try {
      const dato = await db.collection(collectionName).add(newUser);
      return dato;
    } catch (error) {
      console.log(error);
    }
  };

  export const editarDato = async (registro) => {
    try {
      await db.collection(collectionName).doc(registro.id).update({nombre: registro.nombre, apellido: registro.apellido });
    } catch (error) {
      console.log(error);
    }
  };