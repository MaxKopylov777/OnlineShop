import React, { useEffect}  from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Product from '../../Product/Product'
import Categories from '../../Categories/Categories';
import './Home.css';
import { getProductsFromCategories } from '../../../redux/slices/productsSlice';
import { loadBasketFromLS } from '../../../redux/slices/basketSlise';
import { RootState,AppDispach } from '../../../redux/store';

const Home = () => {
    const dispatch:AppDispach = useDispatch()

    const category = useSelector((state:RootState) => state.categories.selectedCategory);

    const products = useSelector((state:RootState)=> state.items.items);


    useEffect(() => {
        const asyncFn = async() => {
            dispatch(loadBasketFromLS());
        };
        asyncFn();
    }, [dispatch]);



    useEffect(()=>{
        dispatch(getProductsFromCategories(category))
    },[dispatch,category]);
   


    const productsData = products.map(({title, price, id, image})=> (
        <Product 
        title={title} 
        price={price} 
        key={id} 
        image={image} 
        id = {id}
        />
    ));

    return (
        <>
            <Categories 
            />
            <div className='Product-container'>
                {products.length ? productsData : <h1>Загрузк...</h1>}
            </div>
        </>
    );
};

export default Home;