import React from 'react'

import { Route, Switch, useRouteMatch } from 'react-router-dom'

import Events from './Events'
import Single from './Single'
import Book from './Book'
import Category from './Category'

export default function All () {
	
	const match = useRouteMatch()
	
	return (
		<>
				<Switch>
					<Route path={`${match.path}/:eventId/book`}>
						<Book />
					</Route>
					<Route path={`${match.path}/cat/:categoryId`}>
						<Category />
					</Route>
					<Route path={`${ match.path }/:slug`}>
						<Single />
					</Route>
					<Route path={`${ match.path }`} >
						<Events />
					</Route>
				</Switch>
		</>
	)
}
