import React, { useRef, useEffect } from 'react'
import { 
	Route,
	Link, 
	Switch,
	useRouteMatch
} from'react-router-dom'

import Dashboard from './Dashboard'
import EventAdmin from './events/EventAdmin'
import CommentAdmin from './comments/CommentAdmin'

import AdminAbout from './AdminAbout'
import SubscriberAdmin from './subscribers/SubscriberAdmin'
import CategoryAdmin from './categories/CategoryAdmin'
import UserAdmin from './users/UserAdmin'
import PartnerAdmin from './partners/PartnerAdmin'

export default function Admin(){
	let match = useRouteMatch()
	let ref = useRef( null )
	
	useEffect( () => {
		ref.current.focus()
		document.title = "Admin"
	}, [ref])
	return (
		<>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-3">
						<div className="card shadow">
							<h5 className="card-header">Admin Navigation</h5>
							<div className="card-body">
								<ul className="nav nav-pills flex-column">
									<li className="nav-item">
										<Link className="nav-link" to={`${ match.url}`}> 
											<span className="fas fa-cogs"></span> <span>Dashboard</span>
										</Link>
									</li>
									<div className="dropdown-divider"></div>
									
									<li className="nav-item">
										<Link className="nav-link" to={`${ match.url}/events#loc`}>
											<span className="fas fa-book-open"></span> <span>Events</span>
										</Link>
									</li>
									<li className="nav-item admin-subnav">
										<Link className="nav-link" to={`${ match.url}/comments#loc`}>
											<span className="fas fa-book"></span> <span>Comments</span>
										</Link>
									</li>
									<li className="nav-item admin-subnav">
										<Link className="nav-link" to={`${ match.url}/categories#loc`}>
											<span className="fas fa-folder"></span>	<span>Categories</span>
										</Link>
									</li>
									<div className="dropdown-divider"></div>
									<li className="nav-item">
										<Link className="nav-link" to={`${ match.url}/about#loc`}>
											<span className="fas fa-users"></span> <span>About</span>
										</Link>
									</li>
									<div className="dropdown-divider"></div>
									<li className="nav-item">
										<Link className="nav-link" to={`${ match.url}/partners#loc`}>
											<span className="fas fa-user-cog"></span> <span>Partners</span>
										</Link>
									</li>
									
									<li className="nav-item">
										<Link className="nav-link" to={`${ match.url}/users#loc`}>
											<span className="fas fa-users"></span> <span>Users</span>
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" to={`${ match.url}/subscribers#loc`}>
											<span className="fas fa-mail-bulk"></span>	<span>Subscribers</span>
										</Link>
									</li>
								</ul>
							</div>
						</div>
						<hr/>
					</div>
					<div ref={ref} id="loc" className="col-md-9">
						<Switch>
							<Route path={`${ match.path }/comments`}>
								<CommentAdmin />
							</Route>			
							<Route path={`${ match.path }/events`}>
								<EventAdmin />
							</Route>
							<Route path={`${ match.path }/subscribers`}>
								<SubscriberAdmin />
							</Route>
							<Route path={`${ match.path }/about`}>
								<AdminAbout />
							</Route>
							<Route path={`${ match.path }/users`}>
								<UserAdmin />
							</Route>
							<Route path={`${ match.path }/partners`}>
								<PartnerAdmin />
							</Route>
							<Route path={`${ match.path }/categories`}>
								<CategoryAdmin />
							</Route>
							<Route path={`${ match.path }/`}>
								<Dashboard />
							</Route>

						</Switch>
					</div>
				</div>
			</div>
		</>
	)
}
