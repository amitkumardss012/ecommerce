// import React, { useState } from 'react';
// import { FaAngleDown } from "react-icons/fa6";

// const categories = [
//     { label: 'Grocery', icon: 'https://rukminim1.flixcart.com/flap/80/80/image/29327f40e9c4d26b.png?q=100' },
//     { label: 'Mobiles', icon: 'https://rukminim1.flixcart.com/flap/80/80/image/22fddf3c7da4c4f4.png?q=100' },
//     { label: 'Fashion', icon: 'https://rukminim1.flixcart.com/fk-p-flap/80/80/image/0d75b34f7d8fbcb3.png?q=100' },
//     { label: 'Electronics', icon: 'https://rukminim1.flixcart.com/flap/80/80/image/69c6589653afdb9a.png?q=100' },
//     { label: 'Home & Furniture', icon: 'https://rukminim1.flixcart.com/flap/80/80/image/ab7e2b022a4587dd.jpg?q=100' },
//     { label: 'Appliances', icon: 'https://rukminim1.flixcart.com/flap/80/80/image/dff3f7adcf3a90c6.png?q=100' },
//     { label: 'Travel', icon: '/placeholder.svg' },
//     { label: 'Beauty, Toys & More', icon: 'https://rukminim1.flixcart.com/flap/80/80/image/dff3f7adcf3a90c6.png?q=100' },
//     { label: 'Two Wheelers', icon: '/placeholder.svg' },
// ];

// const Category = () => {
//     const [hoveredCategory, setHoveredCategory] = useState(null);

//     const handleMouseEnter = (label) => {
//         setHoveredCategory(label);
//     };

//     const handleMouseLeave = () => {
//         setHoveredCategory(null);
//     };

//     const shouldShowPopUp = (label) => {
//         return ["Fashion", "Electronics", "Home & Furniture", "Beauty, Toys & More", "Two Wheelers"].includes(label);
//     };

//     return (
//         <>
//             <nav className="flex justify-center p-4 space-x-8 overflow-x-auto gap-16">
//                 {categories.map((category, index) => (
//                     <div
//                         key={index}
//                         className="flex flex-col items-center cursor-pointer relative"
//                         onMouseEnter={() => handleMouseEnter(category.label)}
//                         onMouseLeave={handleMouseLeave}
//                     >
//                         <img src={category.icon} alt={category.label} className="h-16" />
//                         <span>
//                             {category.label} {shouldShowPopUp(category.label) && <FaAngleDown className="inline w-4 h-4" />}
//                         </span>
//                         {hoveredCategory === category.label && shouldShowPopUp(category.label) && (
//                             <div className="absolute top-20 p-4 bg-white shadow-lg border border-gray-300 z-10">
//                                 {/* Content for the pop-up */}
//                                 {category.label} Content
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </nav>
//         </>
//     );
// };

// export default Category;




// * this is the index showing --> 1.

{/* <div className="absolute bottom-4 left-0 right-0 flex justify-center">
    {images.map((_, index) => (
        <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 w-2.5 bg-gray-400 mx-1 rounded-full focus:outline-none ${index === currentIndex ? 'bg-gray-700' : ''
                }`}
        />
    ))}
</div> */}

// * this is the index showing --> 2.

{/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-full shadow-lg">
    {currentIndex + 1} / {images.length}
</div> */}