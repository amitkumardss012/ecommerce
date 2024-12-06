'use client'

import { useState } from 'react'
import { X, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"  // Assuming Input component exists

interface Product {
    id: string
    name: string
    price: number
    image: string
}

const sampleProducts: Product[] = [
    {
        id: '1',
        name: 'Wireless Earbuds',
        price: 79.99,
        image: '/placeholder.svg?height=80&width=80'
    },
    {
        id: '2',
        name: 'Smart Watch',
        price: 199.99,
        image: '/placeholder.svg?height=80&width=80'
    },
    {
        id: '3',
        name: 'Portable Charger',
        price: 49.99,
        image: '/placeholder.svg?height=80&width=80'
    },
    {
        id: '4',
        name: 'Bluetooth Speaker',
        price: 89.99,
        image: '/placeholder.svg?height=80&width=80'
    },
    {
        id: '5',
        name: 'Laptop Sleeve',
        price: 29.99,
        image: '/placeholder.svg?height=80&width=80'
    }
]

export default function Component({ initialProducts = sampleProducts }: { initialProducts?: Product[] }) {
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [coupon, setCoupon] = useState<string>('')
    const [discount, setDiscount] = useState<number>(0)
    const [isPurchased, setIsPurchased] = useState<boolean>(false)

    const removeProduct = (id: string) => {
        setProducts(products.filter(product => product.id !== id))
    }

    const totalBeforeDiscount = products.reduce((sum, product) => sum + product.price, 0)
    const total = totalBeforeDiscount - discount

    const applyCoupon = () => {
        if (coupon === 'DISCOUNT10') {
            setDiscount(totalBeforeDiscount * 0.1)
            alert('Coupon applied successfully! 10% discount.')
        } else {
            alert('Invalid coupon code')
        }
    }

    const handlePurchase = () => {
        if (products.length === 0) {
            alert("Your cart is empty. Add some products to purchase.")
            return
        }
        setIsPurchased(true)
        alert("Purchase successful! Thank you for your order.")
        setProducts([])  // Empty the cart after purchase
        setDiscount(0)   // Reset the discount
        setCoupon('')    // Clear the coupon field
    }

    return (
        <div className="w-full fixed top-5 h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 p-2 md:p-4">
            <Card className="w-full max-w-lg sm:max-w-3xl mx-auto overflow-hidden shadow-lg border-0 flex flex-col sm:flex-row">

                {/* Left Side: Product List */}
                <div className="flex-1">
                    <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white mb-4 md:mb-0">
                        <CardTitle className="flex items-center justify-between text-lg md:text-2xl">
                            <span className="font-bold">Your Bookmarks</span>
                            <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                        {products.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-base md:text-xl text-gray-500">Your cart is empty</p>
                                <p className="text-sm md:text-base text-gray-400 mt-2">Start adding some awesome products!</p>
                            </div>
                        ) : (
                            <ScrollArea className="h-72 md:h-[400px] pr-2 md:pr-4">
                                {products.map((product) => (
                                    <div key={product.id} className="flex items-center justify-between mb-4 md:mb-6 pb-4 md:pb-6 border-b border-gray-200 last:border-b-0 pt-4 md:pt-6">
                                        <div className="flex items-center space-x-2 md:space-x-4">
                                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden shadow-md">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-base md:text-lg text-gray-800">{product.name}</h3>
                                                <p className="text-indigo-600 font-medium">${product.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeProduct(product.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <X className="h-4 w-4 md:h-5 md:w-5" />
                                            <span className="sr-only">Remove {product.name} from cart</span>
                                        </Button>
                                    </div>
                                ))}
                            </ScrollArea>
                        )}
                    </CardContent>
                </div>

                {/* Right Side: Coupon, Total, and Buy Button */}
                <CardFooter className="md:w-72 lg:w-80 bg-gray-50 flex flex-col justify-between p-4 md:p-6 border-t md:border-l border-gray-200 space-y-4 md:space-y-6">
                    {/* Coupon Code Section */}
                    <div>
                        <Input
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            placeholder="Enter coupon code"
                            className="w-full mb-2 md:mb-4"
                        />
                        <Button
                            onClick={applyCoupon}
                            disabled={!coupon || discount > 0}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            Apply Coupon
                        </Button>
                    </div>

                    {/* Total and Buy Button */}
                    <div className="flex flex-col items-center space-y-2 md:space-y-4 mt-4 md:mt-6">
                        <div className="flex justify-between w-full text-lg md:text-xl font-semibold text-gray-700">
                            <span>Total:</span>
                            <span className="text-xl md:text-2xl font-bold text-indigo-600">${total.toFixed(2)}</span>
                        </div>
                        <Button
                            onClick={handlePurchase}
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                            Buy Now
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
