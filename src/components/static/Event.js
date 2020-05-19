import React from 'react'
import { Link } from 'react-router-dom'
import truncate from 'truncate-html'

export default function Event ( props ) {
	const events = props.events
	const showFrom = props.from || 0
	const showTo = props.to || ( events.length - 1 )
	
	return (
		<div >
			{events.length > 1 && <div className="">
        {events.map( ( event, index ) => {
          if ( index >= showFrom && index <= showTo ) {
						return (
							<div>
								<div key={index} className="card bg-dark text-white shadow">
									<div className="card-header"><h5>{event.title}</h5></div>
									<div className="card-body">
										<div className="row">
											<div className="col-md-4">
												<img alt={event.title}
													src={event.image} width="100%" className="card-image rounded" />
											</div> 
										<div className="col-md-8">
												<div dangerouslySetInnerHTML={{
													__html: truncate( event.description, 50, {
														byWords: true, excludes: [ 'img' ]
													} )
												}}
												></div>
											</div>
										</div>
									</div>
									<div className="card-footer text-right">
										<Link className="btn btn-success btn-sm" to={`/events/${ event._id }/book`}>
											Book
										</Link>
										<Link className="btn btn-danger btn-sm" to={`/events/${ event.slug }`}>
											More
										</Link>
									</div>
								</div>
								<hr />
							</div>
          	)  
        }else{
          return null
        }
              
        })}
			</div>}
		</div>
	)
}
