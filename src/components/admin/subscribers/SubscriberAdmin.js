import React from 'react'

import { Route, Switch, useRouteMatch } from 'react-router-dom'

import SubscriberForm from './SubscriberForm'
import Subscribers from './Subscribers'

export default function SubscriberAdmin () {
	
	const match = useRouteMatch()
	
	return (
		<>
      <div className="card shadow">
				<Switch>
					<Route path={`${match.path}/create`}>
						<SubscriberForm />
					</Route>
					<Route path={`${match.path}/:subscriberId`}>
						<SubscriberForm />
					</Route>
					<Route path={`${ match.path }`} >
						<Subscribers />
					</Route>
				</Switch>
			</div>
		</>
	)
}
