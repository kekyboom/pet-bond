function PetGrid({children}) {
  
  return (
      
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 px-16 pb-16 container">
          {children}
        </div>
      </div>   

  )
}

export default PetGrid;