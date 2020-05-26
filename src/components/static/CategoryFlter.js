import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CategoryFilter ( props ) {
	const [categories, setCategories] = useState([])

	useEffect( () => {
		fetch( '/api/categories' )
			.then( res => res.json() )
			.then(json=>setCategories(json))
	}, [] )
	
	return (
		<div className="col-md-3">
			<div className="card bg-dark text-white">
				<h4 className="card-header text-center">Categories</h4>
				<div className="card-body">
					<ul className="nav flex-column">
						{categories.map( ( cat, index ) => {
							return <li key={index} className="nav-item">
								<Link className="btn btn-outline-primary btn-sm btn-block" to={`/events/cat/${cat._id}`} >
									{cat.name}
								</Link>
							</li>
						})}
					</ul>
				</div>
				<div className="card-footer">
					<small>All categories are wonderful</small>
				</div>
			</div>
		</div>
	)
}
