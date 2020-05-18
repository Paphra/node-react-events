import React, { useEffect, useState, useMemo } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import Moment from 'react-moment'

import Table from '../../static/Table'

export default function Subscribers () {
	const [ subscribers, setSubscribers ] = useState( [] )
	
	useEffect( () => {
		fetch( '/api/subscribers' ).then( res => res.json() )
			.then( json => setSubscribers( json ))
	}, [] )
	
	const match = useRouteMatch()

	const data = useMemo(()=>{

		let count = 0
		let dt = []
		
		subscribers.forEach(subscriber => {
			count++
			dt.push({
				count: count,
				name: subscriber.fullName,
				email: <Link to={`${match.path}/${subscriber._id}`}>
								{subscriber.email}
							</Link>,
				status: subscriber.status,
				joined: <Moment format="MMM Do, YYYY" date={subscriber.joinedOn} />
			})
		});
		return dt
	}, [match, subscribers])

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
			      <h4><i>All Subscribers {subscribers.length}</i></h4>
			    </div>
			    <div className="col-md-3 text-right">
			      <Link
			        to={`${match.url}/create`} 
			        className="btn btn-primary btn-sm">
			        Create A Subscriber
			      </Link>
			    </div>
				</div>
			</div>
			<Table columns={columns} data={data} />
		</>
	)
}
