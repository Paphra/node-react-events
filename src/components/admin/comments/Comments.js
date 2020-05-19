import React, { useEffect, useState, useMemo } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import Moment from 'react-moment'

import Table from '../../static/Table'

export default function Comments () {
	const [ comments, setComments ] = useState( [] )
	
	useEffect( () => {
		fetch( '/api/comments' ).then( res => res.json() )
			.then( json => setComments( json ))
	}, [] )
	
	const match = useRouteMatch()

	const data = useMemo(()=>{

		let count = 0
		let dt = []
		
		comments.forEach(comment => {
			count++
			dt.push({
				count: count,
				name: comment.fullName,
				email: <Link to={`${match.path}/${comment._id}`}>
								{comment.email}
							</Link>,
				status: comment.status,
				joined: <Moment format="MMM Do, YYYY" date={comment.joinedOn} />
			})
		});
		return dt
	}, [match, comments])

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
								All Comments <span className="badge bg-success">{comments.length}</span>
							</i>
						</h4>
			    </div>
			    <div className="col-md-3 text-right">
			      <Link
			        to={`${match.url}/create`} 
			        className="btn btn-primary btn-sm">
			        Create A Comment
			      </Link>
			    </div>
				</div>
			</div>
			<Table columns={columns} data={data} />
		</>
	)
}
