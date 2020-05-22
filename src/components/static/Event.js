import React from 'react'
import { Link } from 'react-router-dom'
import truncate from 'truncate-html'
import Moment from 'react-moment'

import { makeDate } from './Functions'

function Event ( props ) {
	const events = props.events
	const showFrom = props.from || 0
	const showTo = props.to || ( events.length - 1 )

	let upcoming = props.upcoming

	const eventsToShow = (events) => {
		let toShow = []
		let message ="There are no Events Found!"
			
		events.map( ( event, index ) => {
			if ( index >= showFrom && index <= showTo ) {
				let dates = date(
						{date: event.startDate, time: event.startTime},
						{date: event.endDate, time: event.endTime}, upcoming
				)
				return dates.render ?
					toShow.push(
						<div key={index}>
								
							<div className="card bg-dark text-white shadow">
								<div className="card-header"><h5>{event.title}</h5></div>
								<div className="card-body">
									<div className="row">
										<div className="col-md-4">
											<img alt={event.title}
												src={event.image} width="100%" className="card-image rounded" />
										</div>
										<div className="col-md-8">
											<div dangerouslySetInnerHTML={{
												__html: truncate( event.description, 30, {
													byWords: true, excludes: [ 'img' ]
												} )
												}}
											></div>
											<div className="dropdown-divider"></div>
											<div>
												<h6>@ {event.location} at <Moment
													format="hh:mma on MMM Do, YYYY" date={dates.starts.full} /></h6>
												<small><b>{upcoming ? 'Ends' : 'Ended'} at <Moment
													format="hh:mma on MMM Do, YYYY" date={dates.ends.full}/></b></small>
											</div>
										</div>
									</div>
								</div>
								<div className="card-footer text-right">
									<div className="row">
										<div className="col-8">
											<p>
												{upcoming&&<><b>{event.openSlots}</b> Slot(s) remaining |</>} Tickets at @ <b>
													{`${ event.price } ${ event.currency } ${ event.discount ?
													<span className="badge badge-success text-white">
														{`${event.discount} % Discount`}
													</span> : '' }`}  </b>
												{upcoming && <i>
													Starts in {
														dates.starts.days ? dates.starts.days + ' day(s)' :
															dates.starts.hours + ' hour(s)'} 
												</i>}
											</p>
										</div>
										<div className="col-4">
											{upcoming && event.openSlots?
												<Link
												className="btn btn-success btn-sm"
												to={`/events/${ event._id }/book`}>
													Book
												</Link>:''}
											<Link className="btn btn-danger btn-sm" to={`/events/${ event.slug }`}>
												More
											</Link>
										</div>
									</div>
								</div>
							</div>
							<hr />
						</div>):null 
	        }else{
  	        return null
    	    }       
			} )
			if ( toShow.length > 0 ) {
				return toShow
			} else {
				return message
			}
		}

	return (
		<div>
			<h5><i>{props.title}</i></h5>
			{events.length > showFrom ?
				<div>
					{ eventsToShow( events )}
				</div>
				: <i>There are no Events Found!</i>}
		</div>
	)
}

const date = ( start, end, upcoming ) => {
		let render = true
		
		let starts = makeDate( start.date, start.time )
		let ends = makeDate(end.date, end.time )
		
		if ( upcoming ) {
			if ( starts.full < starts.today ) render = false	
		} else {
			if(starts.full > starts.today) render = false
		}
		
		return {
			render: render,
			starts: starts,
			ends: ends
		}
}

export {Event as default, date }
