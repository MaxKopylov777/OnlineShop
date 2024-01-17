
import axios from 'axios';
import { createAsyncThunk, createSlice,  PayloadAction } from "@reduxjs/toolkit";

const BASE_API = 'https://fakestoreapi.com/products'


export const getProductsFromCategories = createAsyncThunk<TItems[], string>(
    'category/fetchProductFromCategories',
    async (category: string) => {
    try{
        const response = await axios.get<TItems[]>(
            category === 'All' ? 
            BASE_API 
            :
            BASE_API + `/category/${category}`
        );
        return response.data;
        }catch(error){
            console.log('error',error)
        } 
    });

    enum Status {
        LOADING = 'loading',
        SUCCESS = 'success',
        ERROR = 'error',
    }

type TItems = {
    id: number, 
    title:string, 
    price: number, 
    category: string, 
    image: string,
};

type TinitialState = {
    items: TItems[],
    status:Status,
}

const initialState: TinitialState = {
    items: [],
    status:Status.LOADING,
};

const productSlice = createSlice({
    name:'items',
    initialState,
    reducers:{
        setSearchWord:(state, action:PayloadAction<string>) =>{
            state.items = state.items.filter((item) => 
                item.title.toLowerCase().includes(action.payload.toLowerCase())
            );

        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProductsFromCategories.pending, (state, action) =>{
            state.status = Status.LOADING;
        });
        builder.addCase(getProductsFromCategories.fulfilled, (state, action) =>{
            state.items =action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(getProductsFromCategories.rejected, (state, action) =>{
            state.status = Status.ERROR;
        });
    },
});

export const { setSearchWord} = productSlice.actions;
export default productSlice.reducer