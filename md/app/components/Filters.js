import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { v4 } from 'uuid'

export default function Filters({ filters }) {
    
    return (
        <nav aria-label="Breadcrumbs" className="order-first flex space-x-2 text-sm font-semibold items-center capitalize">
            {filters.map((item, index, breadcrumbs) =>
                <>
                    {index === 0 ? "" :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 select-none text-slate-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    }
                    {/* {index + 1 === breadcrumbs.length ? (
                        <span key={v4()} className={'text-slate-600 hover:text-slate-600'}>{item.name}</span>
                    ) : (
                        <Link key={v4()} to={item.href} className={'text-slate-500 hover:text-slate-600'}>{item.name}</Link>
                    )} */}
                </>
            )}
        </nav>
    )
}
