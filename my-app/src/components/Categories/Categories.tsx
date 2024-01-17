import React from "react";
import { useEffect, useState } from "react";
import './Categories.css';
import {
    getCategories,
    setSelectedCategory,
} from "../../redux/slices/categoriesSlice";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispach } from '../../redux/store'


const Categories: React.FC = () => {
    const [selCategory, setSelCategory] = useState<string>('All');

    const categories = useSelector((state: RootState) => state.categories.items)

    const dispatch: AppDispach = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const handleCategory = (category: string) => {
        setSelCategory(category);
        dispatch(setSelectedCategory(category));
    };

    const categoriesList = categories.map((category: string, idx: number) => (

        <option key={idx} value={category}>
            {category}
        </option>

    ));

    return (
        <>
            <select
                className="Category"
                value={selCategory}
                onChange={(e) => handleCategory(e.target.value)}
            >
                <option>All</option>
                {categoriesList}
            </select>
        </>
    );
};


export default Categories;