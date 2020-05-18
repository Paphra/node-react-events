import React, { useEffect, useState, useMemo } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import Table from '../../static/Table'

export default function Events(props){
  
	const [events, setEvents] = useState([])
	
	useEffect( () => {
		fetch('/api/events').then(res=>res.json())
			.then(json=>setEvents(json))
	}, [])
	
	const match = useRouteMatch()

	const data = useMemo(()=>{

		let count = 0
		let dt = []
		
		events.forEach(event => {
			count ++
			dt.push({
				count: count,
				title: <Link to={`${match.path}/${event._id}`}>
								{event.title}
							</Link>,
				status: event.status,
				date: event.createdOn
			})
		});
		return dt
	}, [match, events])

	const columns = useMemo(()=>[
		{ Header: "#", accessor: 'count' },
		{ Header: 'Event Title', accessor: 'title' },
		{ Header: "Satus", accessor: 'status' },
		{	Header: 'Created On', accessor: 'date' }
	], [])

	return (
		<>
			<div className="card-header">
			  <div className="row">
			    <div className="col-md-9">
			      <h4><i>All Events {events.length}</i></h4>
			    </div>
			    <div className="col-md-3 text-right">
			      <Link
			        to={`${match.url}/create`} 
			        className="btn btn-primary btn-sm">
			        Create A Event
			      </Link>
			    </div>
			  </div>
			</div>
			<Table columns={columns} data={data} />
			
		</>
	)
} 
