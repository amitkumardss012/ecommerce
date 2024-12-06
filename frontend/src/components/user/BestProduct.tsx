import ProductCard from "./ProductCard";

const products = [
    {
        name: 'Best TrueWireless Headphones',
        price: '4000',
        image: 'https://rukminim2.flixcart.com/image/64/64/l58iaa80/headphone/k/z/m/nord-buds-ce-oneplus-original-imagfyk4hyvgg6ze.jpeg?q=80',
    },
    {
        name: 'Sandisk Extreme Portable',
        price: 'From ₹5,799',
        image: 'https://rukminim2.flixcart.com/flap/64/64/image/24ed491dc3ff9e8a.jpg?q=80',
    },
    {
        name: 'Top Selling Dell Keyboard',
        price: 'From ₹229',
        image: 'https://rukminim2.flixcart.com/image/64/64/kcf4lu80/speaker/mobile-tablet-speaker/h/u/f/srs-xb23-sony-original-imaftk66vjxp86h5.jpeg?q=80',
    },
    {
        name: 'Best Selling Mobile Speaker',
        price: 'From ₹499*',
        image: 'https://rukminim2.flixcart.com/image/64/64/xif0q/dslr-camera/i/o/c/eos-r100-24-1-eos-r100-kit-canon-original-imagqeydhsxgacxp.jpeg?q=80',
    },
    {
        name: 'BenQ Monitors',
        price: 'From ₹9,990',
        image: 'https://rukminim2.flixcart.com/image/64/64/kactpjk0/shaver/m/6/z/philips-s1121-45-s1121-45-original-imafry2qgxcwnm9r.jpeg?q=80',
    },
    {
        name: 'Monitors',
        price: 'From ₹6,599',
        image: 'https://rukminim2.flixcart.com/image/64/64/xif0q/monitor/i/x/5/gw2490-full-hd-24-2024-gw2490-benq-original-imagy6vfbvxjjhpu.jpeg?q=80',
    },
];

const BestProduct = () => {
    return (
        <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Best of Electronics</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                {products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default BestProduct;
