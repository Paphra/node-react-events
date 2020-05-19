import React, { useEffect, useState, useMemo } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import Moment from 'react-moment'

import Table from '../../static/Table'

export default function Partners () {
	const [ partners, setPartners ] = useState( [] )
	
	useEffect( () => {
		fetch( '/api/partners' ).then( res => res.json() )
			.then( json => setPartners( json ))
	}, [] )
	
	const match = useRouteMatch()

	const data = useMemo(()=>{

		let count = 0
		let dt = []
		
		partners.forEach(partner => {
			count++
			dt.push({
				count: count,
				name: <Link to={`${match.path}/${partner._id}`}>
								{partner.name}
							</Link>,
				email: partner.email,
				phone: partner.phone,
				status: partner.status,
				created: <Moment format="MMM Do, YYYY" date={partner.joinedOn} />
			})
		});
		return dt
	}, [match, partners])

	const columns = useMemo(()=>[
		{ Header: "#", accessor: 'count' },
		{ Header: "Name", accessor: 'name' },
		{ Header: 'Email Address', accessor: 'email' },
		{ Header: 'Phone', accessor: 'phone' },
		{ Header: "Status", accessor: 'status' },
		{ Header: "Created On", accessor: 'created'}
	], [] )
	
	return (
		<>
			<div className="card-header">
			  <div className="row">
			    <div className="col-md-9">
			      <h4>
							<i>
								All Partners <span className="badge bg-success">{partners.length}</span>
							</i>
						</h4>
			    </div>
			    <div className="col-md-3 text-right">
			      <Link
			        to={`${match.url}/create`} 
			        className="btn btn-primary btn-sm">
			        Create A Partner
			      </Link>
			    </div>
				</div>
			</div>
			<Table columns={columns} data={data} />
		</>
	)
}
