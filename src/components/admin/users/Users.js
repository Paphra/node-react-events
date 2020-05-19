import React, { useMemo } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import Moment from 'react-moment'

import Table from '../../static/Table'

export default function Users (props) {
	const users = props.users
	const match = useRouteMatch()

	const data = useMemo(()=>{

		let count = 0
		let dt = []
		
		users.forEach(user => {
			count++
			dt.push({
				count: count,
				username: <Link to={`${match.path}/${user._id}`}>
										{user.username}
									</Link>,
				name: user.firstName + ' ' + user.lastName,
				admin: user.admin?
					<span className="badge badge-success">Yes</span> :
					<span className="badge badge-danger">No</span>,
				phone: user.phone,
				partner: user.partner.name,
				status: user.status,
				created: <Moment format="MMM Do, YYYY" date={user.createdOn} />
			})
		});
		return dt
	}, [match, users])

	const columns = useMemo(()=>[
		{ Header: "#", accessor: 'count' },
		{ Header: 'Username', accessor: 'username' },
		{ Header: 'Full Name', accessor: 'name' },
		{ Header: "Phone", accessor: 'phone' },
		{ Header: "Admin", accessor: 'admin' },
		{ Header: "Partner", accessor: 'partner' },
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
								All Users <span className="badge bg-success">{users.length}</span>
							</i>
						</h4>
			    </div>
			    <div className="col-md-3 text-right">
			      <Link
			        to={`${match.url}/create`} 
			        className="btn btn-primary btn-sm">
			        Create A User
			      </Link>
			    </div>
				</div>
			</div>
			<Table columns={columns} data={data} />
		</>
	)
}
