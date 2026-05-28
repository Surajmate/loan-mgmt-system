const TableSkeleton = () => {

  return (

    <div className="bg-white rounded-[32px] p-6 shadow-sm animate-pulse">

      <div className="space-y-5">

        {[...Array(8)].map(
          (_, index) => (

            <div
              key={index}
              className="h-12 bg-slate-200 rounded-2xl"
            ></div>
          )
        )}

      </div>

    </div>
  )
}

export default TableSkeleton