import React from 'react'

export default function ProductLoader() {

    return (
        <div className="rounded-md max-w-sm w-full mx-auto">
            <div className="animate-pulse space-x-4">
                <div className="rounded block bg-slate-200 min-h-80 aspect-w-1 aspect-h-1 h-10 w-full lg:aspect-none lg:h-80"></div>
                <div className="flex-1 space-y-6 py-1 mt-4">
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                </div>
            </div>
        </div>
    )
}
