import React, { useEffect, useState, useMemo } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import Moment from 'react-moment'

import Table from '../../static/Table'

export default function Books () {
	const [ books, setBooks ] = useState( [] )
	
	useEffect( () => {
		fetch( '/api/books' ).then( res => res.json() )
			.then( json => setBooks( json ))
	}, [] )
	
	const match = useRouteMatch()

	const data = useMemo(()=>{

		let count = 0
		let dt = []
		
		books.forEach(book => {
			count++
			dt.push({
				count: count,
				name: book.fullName,
				email: <Link to={`${match.path}/${book._id}`}>
								{book.email}
							</Link>,
				status: book.status,
				joined: <Moment format="MMM Do, YYYY" date={book.joinedOn} />
			})
		});
		return dt
	}, [match, books])

	const columns = useMemo(()=>[
		{ Header: "#", accessor: 'count' },
		{ Header: "Email Address", accessor: 'email' },
		{ Header: 'Full Name', accessor: 'name' },
		{ Header: "Status", accessor: 'status' },
		{ Header: "Joined On", accessor: 'joined'}
	], [] )
	
	return (
		<>
			<div className="card-header">
			  <div className="row">
			    <div className="col-md-9">
			      <h4>
							<i>
								All Bookings <span className="badge bg-success">{books.length}</span>
							</i>
						</h4>
			    </div>
			    <div className="col-md-3 text-right">
			      <Link
			        to={`${match.url}/create`} 
			        className="btn btn-primary btn-sm">
			        Create A Booking
			      </Link>
			    </div>
				</div>
			</div>
			<Table columns={columns} data={data} />
		</>
	)
}
