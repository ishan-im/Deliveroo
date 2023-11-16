import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  resturant: {
    id: null,
    title: null,
    imgUrl: null,
    short_description: null,
    rating: null,
    address: null,
    dishes: null,
    genre: null,
    lat:null,
    long:null
  },
};

export const resturantSlice = createSlice({
  name: 'resturant',
  initialState,
  reducers: {
    setResturant: (state, action) => {
      state.resturant = action.payload;
    },
  },
});

export const {setResturant} = resturantSlice.actions;

export const selectResturant = state => state.resturant.resturant;



export default resturantSlice;
