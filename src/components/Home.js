import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom'
import truncate from 'truncate-html'

import CategoryFilter from './static/CategoryFlter'
import Event, { date } from './static/Event';

function Home () {
  const [ events, setEvents ] = useState([])
  
  useEffect( () => {
    fetch( '/api/events' )
      .then( res => res.json() )
      .then(json=>setEvents(json))
  }, [] )
  
  const generate = (events) => {
    let toShow = []
    let indics = []
    let count = 0
    
    events.map( ( event, index ) => {
      let dates = date(
        { date: event.startDate, time: event.startTime },
        { date: event.endDate, time: event.endTime }, true
      )
      if ( dates.render ) {
        indics.push(<li data-target="#events-slider"
          data-slide-to={count} className={count === 0 ? 'active' : ''}></li> )
        
        toShow.push(<div className={`carousel-item ${ count === 0?'active':'' }`}>
          <img className="d-block w-100" src={event.image} alt={event.title} />
            <div className="carousel-caption">
              <h5>{event.title}</h5>
              <div dangerouslySetInnerHTML={{
                __html: truncate( event.description, 15, {
                  byWords: true, excludes: [ 'img' ]
                } )
              }}></div>
            <p>
							<b>{event.openSlots}</b> Slot(s) remaining | Tickets at @ <b>
								{`${ event.price } ${ event.currency }`} <br />
								  {event.discount ? <span className="badge badge-success text-white">
									{`${event.discount} % Discount`}
								  	</span> : '' }  </b>
									{((dates.starts.days >= 0 || dates.starts.hours > 0)? <i>
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
            <hr />
						{event.openSlots?
							<Link
						  	className="btn btn-success btn-sm"
                to={`/events/${ event._id }/book`}>Book</Link>
              : ''}
            <Link
              className="btn btn-primary btn-sm"
              to={`/events/${ event.slug }`}>More</Link>
          
          </div>
        </div> )
        count ++
      }
      return true
    } )
    let indicators = <ol className="carousel-indicators">
      {indics}      
    </ol>
    let items = <div className="carousel-inner">
          {toShow}
          <a className="carousel-control-prev" style={{left: "-5%"}}  href="#events-slider"
            role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next"style={{right: "-5%"}}  href="#events-slider"
            role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
    return [indicators, items]
  }
  
  return (
    <>
      {events && <div id="events-slider" className="carousel slide"
        data-ride="carousel">
        {generate(events)}
      </div>}
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <Event
              title="More Upcoming Events"
              upcoming={true}
              events={events}
              from={4}
              to={10}
            />
            <hr/>
          </div>
          <CategoryFilter type="upcoming" />
        </div>
        
      </div>
    </>
  );
}

export default Home
