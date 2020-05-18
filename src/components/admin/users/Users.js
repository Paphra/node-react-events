import React, { useEffect, useState, useMemo } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import Table from '../../static/Table'

export default function Users () {
	const [ users, setUsers ] = useState( [] )
	
	useEffect( () => {
		fetch( '/api/users' ).then( res => res.json() )
			.then( json => setUsers( json ))
	}, [] )
	
	const match = useRouteMatch()

	const data = useMemo(()=>{

		let count = 0
		let dt = []
		
		users.forEach(user => {
			count++
			dt.push({
				count: count,
				name: user.fullName,
				email: <Link to={`${match.path}/${user._id}`}>
								{user.email}
							</Link>,
				status: user.status,
				joined: user.joinedOn
			})
		});
		return dt
	}, [match, users])

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
			      <h4><i>All Users {users.length}</i></h4>
			    </div>
			    <div className="col-md-3 text-right">
			      <Link
			        to={`${match.url}/create`} 
			        className="btn btn-primary btn-sm">
			        Create A User
			      </Link>
			    </div>
				</div>
			</div>
			<Table columns={columns} data={data} />
		</>
	)
}
