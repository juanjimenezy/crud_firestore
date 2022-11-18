import { createSlice } from '@reduxjs/toolkit';
import { db } from "../firebase/config";

let initialState = []

const registrosSlice = createSlice({
  name: 'registros',
  initialState,
  reducers: {
    addRegistro: (state, action) => {
      const registro = action.payload;
      state.push(registro);
      //firesotre
      db.collection("usuarios").add({ registro }).then((docRef) => {
        console.log("Registro inscrito con el id: ", registro.id);
      })
        .catch((error) => {
          console.error("Error insertando registro: ", error);
        });
      //
    },
    editRegistro: (state, action) => {
      const { id, nombre, apellido } = action.payload;
      const foundRegistro = state.find((registro) => registro.id === id);
      if (foundRegistro) {
        foundRegistro.nombre = nombre;
        foundRegistro.apellido = apellido;
      }
    },
    deleteRegistro: (state, action) => {
      const foundRegistro = state.find((task) => task.id === action.payload);
      if (foundRegistro) {
        state.splice(state.indexOf(foundRegistro), 1);
      }
    },
    cargarRegistros: (state, action) => {
      const registro = action.payload;
      console.log(registro);
    }
  }
})


export const { addRegistro, editRegistro, deleteRegistro,cargarRegistros } = registrosSlice.actions;
export default registrosSlice.reducer