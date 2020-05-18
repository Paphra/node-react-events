import React from 'react'

import { Route, Switch, useRouteMatch } from 'react-router-dom'

import UserForm from './UserForm'
import Users from './Users'

export default function UserAdmin () {
	
	const match = useRouteMatch()
	
	return (
		<>
      <div className="card shadow">
				<Switch>
					<Route path={`${match.path}/create`}>
						<UserForm />
					</Route>
					<Route path={`${match.path}/:userId`}>
						<UserForm />
					</Route>
					<Route path={`${ match.path }`} >
						<Users />
					</Route>
				</Switch>
			</div>
		</>
	)
}
