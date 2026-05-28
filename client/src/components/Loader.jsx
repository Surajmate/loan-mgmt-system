const Loader = () => {

  return (

    <div className="flex items-center justify-center py-20">

      <div className="relative">

        {/* OUTER */}
        <div className="w-20 h-20 border-4 border-blue-100 rounded-full"></div>

        {/* SPINNER */}
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>

      </div>

    </div>
  )
}

export default Loader