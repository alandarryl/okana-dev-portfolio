import AddToCart from "../AddToCart";
import QuantitySelector from "../QuantitySelector";


const Products = {
    "product1": {
        id: "product1",
        name: "Product 1",
        description: "This is the first product.",
        price: 19.99
    },
    "product2": {
        id: "product2",
        name: "Product 2",
        description: "This is the second product.",
        price: 29.99
    },
    "product3": {
        id: "product3",
        name: "Product 3",
        description: "This is the third product.",
        price: 39.99
    }
};


const Product = async ({ params }) => {
  const { id } = await params;
  const product = Products[id];

    if (!product) {
        return (
            <div>
                <h1>Product Not Found</h1>
                <p>The product you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <div  className="p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center space-y-4 ">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <QuantitySelector />
            <AddToCart product={product.id} />
        </div>
    );
}

export default Product;

