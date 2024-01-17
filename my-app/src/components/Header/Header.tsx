import React, { ChangeEvent } from 'react'
import './Header.css'
import { Link, useNavigate } from "react-router-dom";
import {getProductsFromCategories, setSearchWord} from '../../redux/slices/productsSlice'
import {useDispatch, useSelector} from 'react-redux'
import {RootState, AppDispach} from '../../redux/store'

const Header = () => {
    const dispatch:AppDispach = useDispatch();
    const navigate = useNavigate();

    const total = useSelector(
        (state:RootState) => state.basketShop.totalBasketCount);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.value === ""){
            dispatch(getProductsFromCategories('All'));
        }else {
        dispatch(setSearchWord(e.target.value));
        }   
    };

    
    return ( 
        <div className='Header'>
            <button 
            onClick={()=>{
                navigate("/")
            }}
            className='Main-btn'
            >
                На главную
            </button>
            <div>
                <input
                placeholder="Search"
                onChange={handleChange} 
                className='Input-search'/>
            </div>

            <Link to="/" className='Title-shop'> <h1>Online Shop</h1> </Link>
            <Link to="/basket" className='Basket'>
                Корзина: {total}
                </Link>
        </div>
    )
}

export default Header;