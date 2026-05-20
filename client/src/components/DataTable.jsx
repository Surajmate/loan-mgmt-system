import {
  useMemo,
  useState,
} from 'react'

const DataTable = ({
  data = [],
  columns = [],
  searchableKeys = [],
  filters = [],
  itemsPerPage = 10,
}) => {

  const [search,
    setSearch] =
    useState('')

  const [currentPage,
    setCurrentPage] =
    useState(1)

  const [selectedFilter,
    setSelectedFilter] =
    useState('ALL')

  // SEARCH + FILTER
  const filteredData =
    useMemo(() => {

      return data.filter(
        (item) => {

          // SEARCH
          const matchesSearch =
            searchableKeys.some(
              (key) => {

                const value =
                  key
                    .split('.')
                    .reduce(
                      (
                        obj,
                        k
                      ) =>
                        obj?.[k],
                      item
                    )

                return String(
                  value || ''
                )
                  .toLowerCase()
                  .includes(
                    search.toLowerCase()
                  )
              }
            )

          // FILTER
          const matchesFilter =
            selectedFilter ===
            'ALL'
              ? true
              : item.status ===
                selectedFilter

          return (
            matchesSearch &&
            matchesFilter
          )
        }
      )

    }, [
      data,
      search,
      selectedFilter,
      searchableKeys,
    ])

  // PAGINATION
  const totalPages =
    Math.ceil(
      filteredData.length /
      itemsPerPage
    )

  const paginatedData =
    filteredData.slice(
      (currentPage - 1) *
        itemsPerPage,

      currentPage *
        itemsPerPage
    )

  return (
    <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">

      {/* HEADER */}
      <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-slate-200">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {

            setSearch(
              e.target.value
            )

            setCurrentPage(1)
          }}
          className="border border-slate-300 rounded-2xl px-5 py-3 w-full lg:w-[350px]"
        />

        {/* FILTER */}
        {filters.length > 0 && (
          <select
            value={
              selectedFilter
            }
            onChange={(e) => {

              setSelectedFilter(
                e.target.value
              )

              setCurrentPage(1)
            }}
            className="border border-slate-300 rounded-2xl px-5 py-3"
          >

            <option value="ALL">
              All
            </option>

            {filters.map(
              (filter) => (

                <option
                  key={filter}
                  value={filter}
                >

                  {filter}

                </option>
              )
            )}

          </select>
        )}

      </div>

      {/* TABLE */}
      <div className="overflow-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              {columns.map(
                (column) => (

                  <th
                    key={
                      column.key
                    }
                    className="p-5 text-left whitespace-nowrap"
                  >

                    {
                      column.label
                    }

                  </th>
                )
              )}

            </tr>

          </thead>

          <tbody>

            {paginatedData.length >
            0 ? (

              paginatedData.map(
                (
                  row,
                  index
                ) => (

                  <tr
                    key={index}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >

                    {columns.map(
                      (
                        column
                      ) => (

                        <td
                          key={
                            column.key
                          }
                          className="p-5 whitespace-nowrap"
                        >

                          {column.render
                            ? column.render(
                                row
                              )
                            : column.key
                                .split(
                                  '.'
                                )
                                .reduce(
                                  (
                                    obj,
                                    k
                                  ) =>
                                    obj?.[
                                      k
                                    ],
                                  row
                                )}

                        </td>
                      )
                    )}

                  </tr>
                )
              )

            ) : (

              <tr>

                <td
                  colSpan={
                    columns.length
                  }
                  className="p-10 text-center text-slate-500"
                >

                  No data found

                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}
      <div className="p-5 flex items-center justify-between border-t border-slate-200">

        <p className="text-slate-500">

          Showing
          {' '}
          {paginatedData.length}
          {' '}
          of
          {' '}
          {filteredData.length}

        </p>

        <div className="flex items-center gap-3">

          <button
            disabled={
              currentPage === 1
            }
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
            className="px-4 py-2 rounded-xl border border-slate-300 disabled:opacity-50"
          >

            Prev

          </button>

          <span className="font-semibold">

            {currentPage}
            {' '} / {' '}
            {totalPages || 1}

          </span>

          <button
            disabled={
              currentPage ===
              totalPages
            }
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
            className="px-4 py-2 rounded-xl border border-slate-300 disabled:opacity-50"
          >

            Next

          </button>

        </div>

      </div>

    </div>
  )
}

export default DataTable