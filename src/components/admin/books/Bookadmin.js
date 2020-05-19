import React from 'react'

import { Route, Switch, useRouteMatch } from 'react-router-dom'

import BookForm from './BookForm'
import Books from './Books'

export default function BookAdmin () {
	
	const match = useRouteMatch()
	
	return (
		<>
      <div className="card shadow">
				<Switch>
					<Route path={`${match.path}/create`}>
						<BookForm />
					</Route>
					<Route path={`${match.path}/:bookId`}>
						<BookForm />
					</Route>
					<Route path={`${ match.path }`} >
						<Books />
					</Route>
				</Switch>
			</div>
		</>
	)
}
