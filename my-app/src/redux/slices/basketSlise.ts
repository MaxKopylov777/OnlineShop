import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TItem = {
    id: number, 
    title: string, 
    price: number, 
    image: string,
    count: number,
}

type TInitialState = {
    basketLS: TItem [],
    totalBasketCount: number,
    totalCount:number,
    totalPrice: number,
}


const initialState: TInitialState = {
    basketLS:[],
    totalBasketCount: 0,
    totalCount: 0,
    totalPrice: 0,
};


export const basketSlice = createSlice({
    name: 'basketShop',
    initialState: initialState,
    reducers:{
        addProduct: (state, action:PayloadAction<TItem>)=> {
            const {id, price, count, image, title} = action.payload;
            
        localStorage.setItem(
            id.toString(),
            JSON.stringify({
                title, 
                price: price, 
                count: count,
                image,
         })
        );

        const keyIdLS = Object.keys(localStorage);

        state.basketLS = keyIdLS.map((id)=> {
            const product = JSON.parse(localStorage.getItem(id));
            return {id:Number(id), ...product};
        })
        
        state.totalBasketCount = state.basketLS?.reduce((acc, item) => {
            return acc + item.count;
        }, 0); 
    },
    
        deleteProduct: (state,action:PayloadAction<number>) => {

            const id = action.payload.toString();

            if(localStorage.getItem(id)) {
                const item = JSON.parse(localStorage.getItem(id));

                if(item.count > 1) {
                    item.count -= 1
                    item.price = item.price*item.count
                } else {
                    localStorage.removeItem(id);
                    state.totalBasketCount = 0
                }
            }
        },
        
   

    loadBasketFromLS: (state) => {
        const keyIdLS = Object.keys(localStorage);

        state.basketLS = keyIdLS.map((id)=> {
            const product = JSON.parse(localStorage.getItem(id));
            return {id:Number(id), ...product};
            });

            state.totalPrice = state.basketLS.reduce((acc,item)=> {
                return acc + item.price;
            },0);
    },

    },
});

export const {addProduct,deleteProduct, loadBasketFromLS} = basketSlice.actions;

export default basketSlice.reducer;
