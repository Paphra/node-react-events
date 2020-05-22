import React, { useState, useEffect } from 'react'

import CategoryFilter from './static/CategoryFlter'
import Event from './static/Event'

export default function Events () {
	
	const [ events, setEvents] = useState([])


	useEffect( () => {
		fetch("/api/events")
			.then( res => res.json() )
			.then( json => setEvents( json ) )
	}, [])

	return (
		<div className="container">
      <div className="row">
        <div className="col-md-9">
          <Event
						title="Our Events History"
						upcoming={false}
            events={events}
            from={0}
          />
        </div>
        <CategoryFilter type="upcoming" />
      </div>
        
    </div>
	)
}
