function PetGrid({children}) {
  
  return (
      
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 px-16 pb-20 container mx-auto">
          {children}
        </div>
      </div>   

  )
}

export default PetGrid;