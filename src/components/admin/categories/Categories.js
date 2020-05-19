import React, { useEffect, useState, useMemo } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import Moment from 'react-moment'

import Table from '../../static/Table'

export default function Categories () {
	const [ categories, setCategories ] = useState( [] )
	
	useEffect( () => {
		fetch( '/api/categories' ).then( res => res.json() )
			.then( json => setCategories( json ))
	}, [] )
	
	const match = useRouteMatch()

	const data = useMemo(()=>{

		let count = 0
		let dt = []
		
		categories.forEach(category => {
			count++
			dt.push({
				count: count,
				name: <Link to={`${match.path}/${category._id}`}>
								{category.name}
							</Link>,
				description: category.description,
				created: <Moment format="MMM Do, YYYY" date={category.createdOn} />
			})
		});
		return dt
	}, [match, categories])

	const columns = useMemo(()=>[
		{ Header: "#", accessor: 'count' },
		{ Header: 'Category Name', accessor: 'name' },
		{ Header: 'Description', accessor: 'description' },
		{ Header: "Created On", accessor: 'created'}
	], [] )
	
	return (
		<>
			<div className="card-header">
			  <div className="row">
			    <div className="col-md-9">
			      <h4>
							<i>
								All Categories <span className="badge bg-success">{categories.length}</span>
							</i>
						</h4>
			    </div>
			    <div className="col-md-3 text-right">
			      <Link
			        to={`${match.url}/create`} 
			        className="btn btn-primary btn-sm">
			        Create A Category
			      </Link>
			    </div>
				</div>
			</div>
			<Table columns={columns} data={data} />
		</>
	)
}
