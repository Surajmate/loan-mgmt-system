const PageLoader = () => {

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">

      <div className="relative">

        <div className="w-24 h-24 rounded-full border-4 border-blue-100"></div>

        <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>

      </div>

      <h2 className="text-2xl font-bold text-slate-700 mt-8">

        Loading...

      </h2>

    </div>
  )
}

export default PageLoader