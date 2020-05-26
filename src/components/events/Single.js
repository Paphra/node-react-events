import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Moment from 'react-moment'

import { date } from '../static/Event'
import Partners from '../static/Partners'

export default function Single () {
	const { slug } = useParams()
	const [ event, setEvent ] = useState( null )
	const [ dates, setDates ] = useState( null )
	const [ size, setSize] = useState(window.innerWidth)

	useEffect( () => {
		window.addEventListener( 'resize', ( win, evt ) => {
			setSize(window.innerWidth)
		} )
		
		fetch( "/api/events/slug/" + slug )
			.then( res => res.json() )
			.then( json => {
				setEvent( json )
				setDates(date(
					{ date: json.startDate, time: json.startTime },
					{ date: json.endDate, time: json.endTime },
					true
				))
			} )

	}, [ slug ] )
	
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-2"></div>
				<div className="col-md-8">
					{event&&dates?<div className="card">
						<h5 className="card-header">{event.title}</h5>
						<div className="card-body">
							<div className="row">	
								<div className="col-8">
								<p>
									{dates.render&&<><b>{event.openSlots}</b> Slot(s) remaining |</>} Tickets at @ <b>
											{`${ event.price } ${ event.currency }`} <br />
											{event.discount ? <span className="badge badge-success text-white">
												{`${event.discount} % Discount`}
													</span> : '' }  </b>
												{dates.render&&((dates.starts.days >= 0 || dates.starts.hours > 0)? <i>
													| Starts in {
														dates.starts.days >= 0 ? dates.starts.days + ' day(s)' :
															dates.starts.hours + ' hour(s)'} 
												</i>:<i> | Started {
														dates.starts.hours <= -24  ? (-dates.starts.days) + ' day(s) Ago' :
																( -dates.starts.hours ) + ' hour(s) Ago'}
														{(dates.ends.days >= 0 || dates.ends.hours > 0) && <b> | Ends in  {
																dates.ends.hours >= 24  ? (dates.ends.days) + ' day(s)' :
																( dates.ends.hours ) + ' hour(s)'}
													</b>}
												</i>)}
											</p>
										</div>
								<div className="col-4 text-right">
									{dates.render && event.openSlots?
										<Link
											className="btn btn-success"
											to={`/events/${ event._id }/book`}>Book Event</Link>:''}									
								</div>
							</div>
							<hr/>
							<div className="row p-3">
								<div className="col-4 text-right"><b>Location:</b></div>
								<div className="col-8">{event.location}</div>
								<div className="col-4 text-right"><b>Start</b></div>
								<div className="col-8">
									<Moment
										format="hh:mma on MMM Do, YYYY"
										date={dates.starts.full} />
								</div>
								<div className="col-4 text-right"><b>End</b></div>
								<div className="col-8">
									<Moment
										format="hh:mma on MMM Do, YYYY"
										date={dates.ends.full} />
								</div>
							</div>
							<hr/>
							<div dangerouslySetInnerHTML={{
								__html: event.description
							}} />
							<hr />
							{event.partners && <div className="sponsors container">
								<Partners
									title="Sponsors"
									partners={event.partners}
									size={size}
								/>
							</div>}
						</div>
						<div className="card-footer">
							<Link to="/events" className="btn btn-danger btn-sm" >
								View All Upcoming Events
							</Link>
						</div>
					</div>:''}
				</div>
				<div className="col-md-2"></div>
			</div>
		</div>
		
	)
}
