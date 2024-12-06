"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, MapPin, CreditCard, ShoppingCart } from "lucide-react"

const steps = [
    { title: "Address", icon: MapPin },
    { title: "Summary", icon: ShoppingCart },
    { title: "Payment", icon: CreditCard },
]

export default function CheckoutStepper() {
    const [currentStep, setCurrentStep] = useState(0)
    const [completedSteps, setCompletedSteps] = useState<number[]>([])

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1)
            setCompletedSteps((prev) => [...prev, currentStep])
        }
    }

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1)
        }
    }

    const handleStepClick = (index: number) => {
        if (index < currentStep || completedSteps.includes(index - 1)) {
            setCurrentStep(index)
        }
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return <AddressStep />
            case 1:
                return <SummaryStep />
            case 2:
                return <PaymentStep />
            default:
                return null
        }
    }

    return (
        <div className="w-full mt-8 max-w-4xl mx-auto p-6 space-y-8 bg-gradient-to-br   flex items-center justify-center">
            <Card className="w-full shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Checkout Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="relative">
                        <div className="flex justify-between items-center">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center z-10 cursor-pointer"
                                    onClick={() => handleStepClick(index)}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`Go to ${step.title} step`}
                                >
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center ${index === currentStep
                                            ? "bg-primary text-primary-foreground ring-4 ring-primary ring-opacity-50"
                                            : completedSteps.includes(index)
                                                ? "bg-green-500 text-white"
                                                : "bg-muted text-muted-foreground"
                                            } transition-all duration-300 ease-in-out`}
                                    >
                                        {completedSteps.includes(index) ? (
                                            <CheckCircle2 className="w-6 h-6" />
                                        ) : (
                                            <step.icon className="w-6 h-6" />
                                        )}
                                    </div>
                                    <span className="text-sm mt-2 font-medium">{step.title}</span>
                                </div>
                            ))}
                        </div>
                        <div className="absolute top-6 left-0 right-0 h-1 bg-muted">
                            {/* Black line to indicate progress - only visible between completed steps */}
                            {completedSteps.length > 0 && (
                                <div
                                    className="absolute top-0 left-[3px] h-1 bg-black transition-all duration-300 ease-in-out"
                                    style={{
                                        width: `${(currentStep / (steps.length - 1)) * 93}%`
                                    }}
                                ></div>
                            )}
                            {/* Main progress bar */}
                            <div
                                className="h-full bg-primary transition-all duration-300 ease-in-out"
                                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="mt-8">{renderStepContent()}</div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={handlePrevious} disabled={currentStep === 0} variant="outline">
                        Previous
                    </Button>
                    <Button onClick={handleNext} disabled={currentStep === steps.length - 1}>
                        {currentStep === steps.length - 1 ? "Place Order" : "Next"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

function AddressStep() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shipping Address</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                </div>
                <div className="space-y-2 col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main St" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input id="zipCode" placeholder="10001" />
                </div>
            </div>
        </div>
    )
}

function SummaryStep() {
    const products = [
        { name: "Product 1", price: 19.99, quantity: 2 },
        { name: "Product 2", price: 29.99, quantity: 1 },
    ]

    const subtotal = products.reduce((acc, product) => acc + product.price * product.quantity, 0)
    const shipping = 5.99
    const total = subtotal + shipping

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <div className="space-y-2">
                {products.map((product, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <span>
                            {product.name} x {product.quantity}
                        </span>
                        <span>${(product.price * product.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center font-semibold text-lg mt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    )
}

function PaymentStep() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Information</h3>
            <div className="space-y-2">
                <Label htmlFor="cardName">Name on Card</Label>
                <Input id="cardName" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="expirationDate">Expiration Date</Label>
                    <Input id="expirationDate" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                </div>
            </div>
        </div>
    )
}
