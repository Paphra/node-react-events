import React from 'react'

import { Route, Switch, useRouteMatch } from 'react-router-dom'

import CategoryForm from './CategoryForm'
import Categories from './Categories'

export default function CategoryAdmin () {
	
	const match = useRouteMatch()
	
	return (
		<>
      <div className="card shadow">
				<Switch>
					<Route path={`${match.path}/create`}>
						<CategoryForm />
					</Route>
					<Route path={`${match.path}/:categoryId`}>
						<CategoryForm />
					</Route>
					<Route path={`${ match.path }`} >
						<Categories />
					</Route>
				</Switch>
			</div>
		</>
	)
}
