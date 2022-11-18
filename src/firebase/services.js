  import { db } from "./config";
  
  const collectionName = "usuarios";

  export const obtenerDatos = async () => {
    try {
        const data = await db.collection(collectionName).get();
        const docs = [];
        data.forEach((doc) => {docs.push({...doc.data(), id: doc.id})});
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

  export const guardarDatos = async (usuario) => {
    try {
      const dato = await db.collection(collectionName).add(usuario);
      return dato;
    } catch (error) {
      console.log(error);
    }
  };

  export const editarDato = async (registro) => {
    try {
      await db.collection(collectionName).doc(registro.id).update({ nombre: registro.nombre, apellido: registro.apellido });
    } catch (error) {
      console.log(error);
    }
  };