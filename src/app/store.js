import {configureStore} from '@reduxjs/toolkit';
import registrosReducer from '../features/registrosSlice';

export const store = configureStore({
    reducer:{
        registros: registrosReducer,
    }
    

})