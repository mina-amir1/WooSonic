import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Link } from '@remix-run/react';
import React, { Fragment } from 'react'
import { v4 } from 'uuid';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
export default function Breadcrumbs({ breadcrumbs, className }) {
    return (
        <nav aria-label="Breadcrumbs" className={classNames(
            "order-first flex space-x-2 text-sm font-semibold items-center capitalize", className
        )}>
            {breadcrumbs.map((item, index, breadcrumbs) =>
                <Fragment key={index}>
                    {index === 0 ? "" :
                        <ChevronRightIcon className='w-4 h-4 select-none text-slate-500' />
                    }
                    {index + 1 === breadcrumbs.length ? (
                        <span className={'text-slate-600 hover:text-slate-600'}>{item.name}</span>
                    ) : (
                        <Link to={item.href} className={'text-slate-500 hover:text-slate-600'}>{item.name}</Link>
                    )}
                </Fragment>
            )}
        </nav>
    )
}
