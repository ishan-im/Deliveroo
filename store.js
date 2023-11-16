import {configureStore} from '@reduxjs/toolkit';
import basketSlice from './features/basketSlice';

import resturantSlice from './features/resturantSlice';

export default store = configureStore({
  reducer: {
    basket:basketSlice.reducer,
    resturant:resturantSlice.reducer,
  },
});
