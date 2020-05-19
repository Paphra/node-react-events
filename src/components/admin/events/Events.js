import React, { useMemo, useState, useEffect } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import Moment from 'react-moment'

import Table from '../../static/Table'

export default function Events () {
	const match = useRouteMatch()

	const [ events, setEvents ] = useState( [] )
	
	useEffect( () => {
		fetch( '/api/events' )
			.then( res => res.json() )
			.then(json=>setEvents(json))
	}, [])

	const data = useMemo(()=>{

		let count = 0
		let dt = []
		
		events.forEach(event => {
			count++
			dt.push({
				count: count,
				title: <Link to={`${match.path}/${event._id}`}>
										{event.title}
									</Link>,
				location: event.location,
				start: <Moment
					date={event.startDate + 'T' + event.startTime}
					format="HH:mm Do, MM YYYY"
				/>,
				end: <Moment
					date={event.endDate + 'T' + event.endTime}
					format="HH:mm Do, MM YYYY"
				/>,
				status: event.status,
				created: <Moment format="MMM Do, YYYY" date={event.createdOn} />
			})
		});
		return dt
	}, [match, events])

	const columns = useMemo(()=>[
		{ Header: "#", accessor: 'count' },
		{ Header: 'Event Title', accessor: 'title' },
		{ Header: 'Location', accessor: 'location' },
		{ Header: "Starts", accessor: 'start' },
		{ Header: "Ends", accessor: 'end' },
		{ Header: "Status", accessor: 'status' },
		{ Header: "Created On", accessor: 'created'}
	], [] )
	
	return (
		<>
			<div className="card-header">
			  <div className="row">
			    <div className="col-md-9">
						<h4>
							<i>
								All Events <span className="badge bg-success">{events.length}</span>
							</i>
						</h4>
			    </div>
			    <div className="col-md-3 text-right">
			      <Link
			        to={`${match.url}/create`} 
			        className="btn btn-primary btn-sm">
			        Create An Event
			      </Link>
			    </div>
				</div>
			</div>
			<Table columns={columns} data={data} />
		</>
	)
}
