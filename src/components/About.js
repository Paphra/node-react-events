import React, { useState, useEffect } from 'react'

export default function About(){
	const [ about, setAbout] = useState(null)

	useEffect( () => {
		fetch("/api/about")
			.then( res => res.json() )
			.then(json=>setAbout(json))
	})
	
	return (
		<div className="card">
			<h3 className="card-header">About Us</h3>
			<div className="card-body">
				{about && <div>
					<div className=""
						dangerouslySetInnerHTML={{
							__html: about.description
						}}
					></div>
				</div>}
			</div>
		</div>
	)
}
