import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Single () {
	const { slug } = useParams()
	const [ event, setEvent ] = useState( null )
	
	useEffect( () => {
		fetch( "/api/events/slug/" + slug )
			.then( res => res.json() )
			.then( json => {
				setEvent( json )
			} )
		
	}, [slug])
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-2"></div>
				<div className="col-md-8">
					{event&&<div className="card">
						<h5 className="card-header">{event.title}</h5>
						<div className="card-body">

							<div dangerouslySetInnerHTML={{
								__html: event.description
							}} />
						</div>
						<div className="card-footer"></div>
					</div>}
				</div>
				<div className="col-md-2"></div>
			</div>
		</div>
		
	)
}
