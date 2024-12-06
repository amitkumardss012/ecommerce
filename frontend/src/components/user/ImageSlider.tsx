// src/ImageSlider.tsx
import React, { useState, useEffect, useRef } from 'react';

const images = [
    "https://via.placeholder.com/800x400.png?text=Slide+1",
    "https://via.placeholder.com/800x400.png?text=Slide+2",
    "https://via.placeholder.com/800x400.png?text=Slide+3",
    "https://via.placeholder.com/800x400.png?text=Slide+4",
    "https://via.placeholder.com/800x400.png?text=Slide+5",
];

const ImageSlider: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(1); // Start from the first real image
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const transitionRef = useRef<HTMLDivElement | null>(null);

    // Create an array with cloned first and last images
    const extendedImages = [
        images[images.length - 1],
        ...images,
        images[0],
    ];

    const handlePrevClick = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    useEffect(() => {
        if (transitionRef.current) {
            transitionRef.current.style.transition = isTransitioning ? 'transform 0.5s ease' : 'none';
        }
    }, [isTransitioning]);

    useEffect(() => {
        const handleTransitionEnd = () => {
            setIsTransitioning(false);
            if (currentIndex === 0) {
                setCurrentIndex(images.length);
            } else if (currentIndex === images.length + 1) {
                setCurrentIndex(1);
            }
        };

        const currentRef = transitionRef.current;
        if (currentRef) {
            currentRef.addEventListener('transitionend', handleTransitionEnd);
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('transitionend', handleTransitionEnd);
            }
        };
    }, [currentIndex]);

    return (
        <div className="relative w-full h-80 overflow-hidden">
            <div
                ref={transitionRef}
                className="flex"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {extendedImages.map((image, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                        <img src={image} alt={`Slide ${index}`} className="w-full h-80 object-cover" />
                    </div>
                ))}
            </div>
            <button
                onClick={handlePrevClick}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg focus:outline-none"
            >
                Prev
            </button>
            <button
                onClick={handleNextClick}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg focus:outline-none"
            >
                Next
            </button>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2.5 w-2.5 bg-gray-400 mx-1 rounded-full focus:outline-none ${index === currentIndex -1 ? 'bg-gray-700' : ''
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
