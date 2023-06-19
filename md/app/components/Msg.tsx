
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Msg({message,color}:any) {
    return (
        <div 
            className={classNames(
                color==='yellow' ? 'text-yellow-800 bg-yellow-100':'',
                color==='green' ? 'text-green-800 bg-green-100':'',
                color==='gray' ? 'text-gray-800 bg-gray-100':'',
                color==='red' ? 'text-red-800 bg-red-100':'',
                'flex p-4 text-sm  rounded-lg'
            )}
            role="alert">
            <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Info</span>
            <div dangerouslySetInnerHTML={{__html:message}}/>
        </div>
    )
}
