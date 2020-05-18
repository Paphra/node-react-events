import React from 'react'

import { Route, Switch, useRouteMatch } from 'react-router-dom'

import PartnerForm from './PartnerForm'
import Partners from './Partners'

export default function PartnerAdmin () {
	
	const match = useRouteMatch()
	
	return (
		<>
      <div className="card shadow">
				<Switch>
					<Route path={`${match.path}/create`}>
						<PartnerForm />
					</Route>
					<Route path={`${match.path}/:partnerId`}>
						<PartnerForm />
					</Route>
					<Route path={`${ match.path }`} >
						<Partners />
					</Route>
				</Switch>
			</div>
		</>
	)
}
