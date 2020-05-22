import React, { useState, useEffect } from 'react'

import CategoryFilter from '../static/CategoryFlter'
import Event from '../static/Event'
import { useParams } from 'react-router-dom'

export default function Events () {
	const { categoryId } = useParams()
	const [ events, setEvents ] = useState( [] )
	const [ cat, setCat ] = useState(null)

	useEffect( () => {
		fetch( "/api/categories/" + categoryId )
			.then( res => res.json() )
			.then( json => setCat( json ) )
		
		fetch("/api/events")
			.then( res => res.json() )
			.then( json => {
				let catEvents = []
				json.map( event => {
					if ( event.category._id.toString() === categoryId ) {
						catEvents.push(event)
					}
					return true
				})
				setEvents( catEvents )
			} )
	}, [categoryId])

	return (
		<div className="container">
      <div className="row">
				<div className="col-md-9">
					<h4><i>Events | {cat&&cat.name} Category </i></h4>
					<hr/>
          <Event
						title="Upcoming Events"
						upcoming={true}
            events={events}
            from={0}
					/>
					<hr/>
					<Event
						title="Events History"
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
