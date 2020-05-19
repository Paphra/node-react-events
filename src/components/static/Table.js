import React, { useState, useEffect } from 'react'

import {
  useTable,
  //useGroupBy,
  //useFilters,
  // useSortBy,
  //useExpanded,
  usePagination,
} from 'react-table'

export default function Table (props) {

	const [columns, setColumns] = useState([])
	const [data, setData] = useState([])

	useEffect( () => {
		setColumns( props.columns )
		setData( props.data )
		
	}, [ props ] )
	
	const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
		prepareRow,
		page,

		canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
	} = useTable(
		{ columns, data, initialState: { pageIndex: 0} },
		usePagination
		)
	
	
	return (
		<div className="p-2">
			<div className="table-responsive">
				<table {...getTableProps()} style={{ border: 'solid 1px blue', width: '100%', fontSize: "9" }}>
					<thead>
						{headerGroups.map(headerGroup => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map(column => (
									<th
										{...column.getHeaderProps()}
										style={{
											borderBottom: 'solid 3px red',
											background: 'aliceblue',
											color: 'black',
										}}
									>
										<small><b>{column.render('Header')}</b></small>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{page.map(row => {
							prepareRow(row)
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map(cell => {
										return (
											<td
												{...cell.getCellProps()}
												style={{
													border: 'solid 1px gray',
													background: 'papayawhip',
												}}
											>
												<small>{cell.render('Cell')}</small>
											</td>
										)
									})}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
			<br />
			<nav aria-label="Page navigation">
				<ul className="pagination justify-content-center">
					<li className="page-item">
						<button className="btn btn-primary btn-sm" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          		<span className="fas fa-fast-backward"></span>
						</button>
					</li>
					<li className="page-item">
						<button className="btn btn-success btn-sm" onClick={() => previousPage()} disabled={!canPreviousPage}>
          		<span className="fas fa-chevron-left"></span>
						</button>
					</li>
					<li className="page-item">
						<button className="btn btn-default btn-sm">
							<span>Page <strong>{pageIndex + 1} of {pageOptions.length}</strong></span>
						</button>
					</li>
					<li className="page-item">
						<button className="btn btn-success btn-sm" onClick={() => nextPage()} disabled={!canNextPage}>
							<span className="fas fa-chevron-right"></span>
						</button>
					</li>
					<li className="page-item">
						<button className="btn btn-primary btn-sm" onClick={() => nextPage(pageCount -1)} disabled={!canNextPage}>
          		<span className="fas fa-fast-forward"></span>
						</button>
					</li>
				</ul>
			</nav>
      <div className="row">
				<div className="col-md-4"></div>
				<div className="col-md-4">
					<div className="row">
						<div className="col-4">
							<input
								className="form-control"
								type="number"
								defaultValue={pageIndex + 1}
								onChange={e => {
									const page = e.target.value ? Number(e.target.value) - 1 : 0
									gotoPage(page)
								}}
							/>
						</div>
						<div className="col-8">
							<select
								className="form-control"
								value={pageSize}
								onChange={e => {
									setPageSize(Number(e.target.value))
								}}
							>
								{[10, 20, 30, 40, 50].map(pageSize => (
									<option key={pageSize} value={pageSize}>
										Show {pageSize}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
				<div className="col-md-4"></div>
			</div>
		</div>
	)
}
