

const ProductCard = ({ product }: any) => {
    return (
        <div className="border rounded-lg p-4 flex flex-col justify-center items-center">
            <div className="flex justify-center">
                <img src={product.image} alt={product.name} className="mb-4" />
            </div>
            <h3 className="text-lg font-medium text-center truncate w-full" title={product.name}>
                {product.name}
            </h3>
            <p className="text-blue-500 mt-4">{product.price}</p>
        </div>
    );
};

export default ProductCard;

