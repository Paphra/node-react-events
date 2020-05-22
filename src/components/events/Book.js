import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Book () {
	const { eventId } = useParams()
	const [ event, setEvent] = useState(null)

	useEffect( () => {
		fetch( "/api/events/" + eventId )
			.then( res => res.json() )
			.then( json => setEvent( json ) )
		
	}, [eventId])

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-3"></div>
				<div className="col-md-6">
					<div className="card shadow">
						<h5 className="card-header">Book Event: {event&&event.title} </h5>
						<div className="card-body">

						</div>
						<div className="card-footer text-right">
							<a href="#order" className="btn btn-primary">Place Order</a>
						</div>
					</div>
				</div>
				<div className="col-md-3"></div>
			</div>
		</div>
	)
}
