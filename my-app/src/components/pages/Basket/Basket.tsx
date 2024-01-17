import React, { useEffect } from 'react'
import './Basket.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { loadBasketFromLS } from '../../../redux/slices/basketSlise'
import Product from '../../Product/Product';
import { AppDispach, RootState } from '../../../redux/store'


const Basket = () => {
    const productsBasket = useSelector(
        (state:RootState) => state.basketShop.basketLS
        );
    const total = useSelector((state:RootState) => state.basketShop.totalPrice);
    const dispatch: AppDispach = useDispatch();

    useEffect(() => {
        dispatch(loadBasketFromLS());
    }, [dispatch]);


    const productsBasketUI = productsBasket.map(
        ({ id, title, price, image }) => (
            <Product title={title}
                price={price}
                key={id}
                image={image}
                id={id} />
        ));

    return (
        <>
            <div className='Product-container'>{productsBasketUI}</div>
            <h2>Итоговая сумма: {total} $</h2>
        </>
    );
}

export default Basket;