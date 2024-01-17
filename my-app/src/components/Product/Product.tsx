import React from 'react'
import { Link } from "react-router-dom"
import './Product.css';
import { useEffect, useState } from "react";
import {addProduct, deleteProduct} from '../../redux/slices/basketSlise';
import {useDispatch, useSelector} from "react-redux";
import {RootState,AppDispach} from '../../redux/store'

type TProps = {
    id: number,
    title: string,
    price: number,
    image:string,
}


const Product = (props:TProps) => {
    const dispatch:AppDispach = useDispatch();
    const basketLS = useSelector((state:RootState)=> state.basketShop.basketLS);

    const [count, setCount] = useState(0);

    const {title,price,image,id,} = props;


    useEffect(()=> {
        const findProductFromBasket = basketLS.find((item) => item.id === id)
    
        if(findProductFromBasket){
            setCount(findProductFromBasket.count)
        }
    
    },[basketLS, id])

    const addBasket = () => {
        setCount(count+1);
    };

    const deleteBasket = () => {
        count > 0 && setCount(count - 1);
        dispatch(deleteProduct(id));
    }

    useEffect(()=> {
        const data = {
            id: id, 
            title: title, 
            price: price, 
            count: count, 
            image: image,
    };
        count > 0 && dispatch(addProduct(data));
    },[dispatch, count]);
    

    return (
        <div className="Product-item">
            <Link to={`/card/${id}`} className="Product-title">
                {title}
            </Link>
            <h3>{count > 0 ? (price * count).toFixed(2) : price} $</h3>
            <img width='200px' height='250px' src={image} alt={title}/>
            <div className="Add-product">
                <button className="Btn-add" onClick={addBasket}>
                    +
                </button>
                <button 
                className="Btn-add"
                onClick={deleteBasket}>
                    -
                </button>
            </div>
            <div className="Count">Количество:
            {count} 
             </div>
        </div>
    );
};

export default Product;