"use client";

import { useState } from "react";


const QuantitySelector = () =>{

    const [quantity, setQuantity] = useState(1);

    const increment = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    }


    return(
        <div className="flex items-center space-x-2">
            <button className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400" onClick={decrement}>
                -
            </button>
            <span>{quantity}</span>
            <button className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400" onClick={increment}>
                +
            </button>
        </div>
    )

}

export default QuantitySelector;
