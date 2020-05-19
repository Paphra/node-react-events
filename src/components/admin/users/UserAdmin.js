import React, { useState, useEffect } from 'react'

import { Route, Switch, useRouteMatch } from 'react-router-dom'

import UserForm from './UserForm'
import Users from './Users'

export default function UserAdmin () {
	const [ users, setUsers ] = useState( [] )
	const match = useRouteMatch()
	
	useEffect( () => {
		fetch( '/api/users' ).then( res => res.json() )
			.then( json => setUsers( json ))
	}, [] )
	
	return (
		<>
      <div className="card shadow">
				<Switch>
					<Route path={`${ match.path }/create`}>
						<UserForm users={ users } />
					</Route>
					<Route path={`${ match.path }/:userId`}>
						<UserForm users={ users } />
					</Route>
					<Route path={`${ match.path }`} >
						<Users users={ users } />
					</Route>
				</Switch>
			</div>
		</>
	)
}
