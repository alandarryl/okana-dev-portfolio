"use client";

import { useState } from "react";

const AddToCart = ({ product }) => {

    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        setAdded(true);
        console.log(`Added ${product} to cart`);
    };

    return (
        <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            {added ? "Added to Cart" : "Add to Cart"}
        </button>
    );
}

export default AddToCart;

