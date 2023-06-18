import React from 'react'

export default function Stars({nearestNumberRating}:any) {
    return (
        <div className="mt-6">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
                <div className="flex items-center">
                    {Array(5).fill(0).map((_, idx) => (
                        <svg key={idx} className={`h-5 w-5 flex-shrink-0 ${idx < nearestNumberRating ? "text-gray-900" : "text-gray-200"}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                        </svg>
                    ))}
                </div>
                <p className="sr-only">{nearestNumberRating} out of 5 stars</p>
            </div>
        </div>
    )
}
