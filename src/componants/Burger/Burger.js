import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {changeRate, searchInput, sortByPrice, sortByTitle} from "../../redux/actions/productActions";
const Burger = ({setBurgerMenu}) => {
    const dispatch = useDispatch()
    const [searchText, setSearchText] = useState("")

    const clickChangeRate = (rate) => {
        setBurgerMenu(false)
        dispatch(changeRate(rate))
    }

    const clickSortByRate = () => {
        dispatch(sortByPrice())
        setBurgerMenu(false)
    }

    const clickSortByTitle = () => {
        dispatch(sortByTitle())
        setBurgerMenu(false)
    }

    const searchValue = (e) => {
        dispatch(searchInput(searchText))
        setSearchText(e.target.value.trim())
    }

    return (
        <div onClick={() => setBurgerMenu(false)} className="z-50 fixed inset-0">
            <div onClick={(e) => e.stopPropagation()} className="z-50 fixed top-0 right-0 bottom-0 w-80 bg-gray-800">
                <div className="text-2xl text-white text-center mt-16 mb-8">Select currency:</div>
                <div className="flex justify-around  mb-5">
                    <button onClick={() => clickChangeRate(["USD", '$'])} className="bg-gray-300 px-3 py-1 font-semibold rounded-md">USD</button>
                    <button onClick={() => clickChangeRate(["RUB", 'руб'])} className="bg-gray-300 px-3 py-1 font-semibold rounded-md">RUB</button>
                    <button onClick={() => clickChangeRate(["KGS", 'сом'])} className="bg-gray-300 px-3 py-1 font-semibold rounded-md">KGS</button>
                </div>
                <div className="text-2xl text-white text-center mb-8">Sort:</div>
                <div className="flex justify-around mb-8">
                    <button onClick={clickSortByRate} className="bg-gray-300 px-3 py-1 font-semibold rounded-md">Price</button>
                    <button onClick={clickSortByTitle} className="bg-gray-300 px-3 py-1 font-semibold rounded-md">Title</button>
                </div>
                <div className="text-2xl text-white text-center mb-8">Enter the title:</div>
                <div className="flex justify-center">
                    <input className="p-1 rounded-lg"  onChange={searchValue} type="text"/>
                </div>
            </div>
        </div>
    );
};

export default Burger;