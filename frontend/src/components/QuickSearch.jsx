function QuickFilter() {
    return (
        <div className="container mx-auto px-15">
            <div className="flex flex-wrap gap-2 pt-10 pb-4">
                <button className="text-pbblue py-2 px-3 bg-white border border-pbblue rounded duration-500 hover:scale-102 hover:shadow-md hover:text-pbdarkblue cursor-pointer">Santiago</button>
                <button className="text-pbblue py-2 px-3 bg-white border border-pbblue rounded duration-500 hover:scale-102 hover:shadow-md hover:text-pbdarkblue cursor-pointer">Macho</button>
                <button className="text-pbblue py-2 px-3 bg-white border border-pbblue rounded duration-500 hover:scale-102 hover:shadow-md hover:text-pbdarkblue cursor-pointer">Hembra</button>
                <button className="text-pbblue py-2 px-3 bg-white border border-pbblue rounded duration-500 hover:scale-102 hover:shadow-md hover:text-pbdarkblue cursor-pointer">Esterilizado</button>
                <button className="text-pbblue py-2 px-3 bg-white border border-pbblue rounded duration-500 hover:scale-102 hover:shadow-md hover:text-pbdarkblue cursor-pointer">Con Chip</button>
            </div>
        </div>       
    )
}

export default QuickFilter;