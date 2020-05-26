import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Success from './Success'
import Partners from './Partners'

function Footer () {
	const [ about, setAbout ] = useState(null)
	const [ partners, setpartners ] = useState( [] )
	const [ size, setSize] = useState(window.innerWidth)
		
	const [ name, setName ] = useState( '' )
	const [ email, setEmail ] = useState( '' )
	const [ success, setSuccess ] = useState(false)
	
	const subscribe = ( evt ) => {
		let pro = true
		if ( name.trim() === '' ) {
			pro = false			
		}
		if ( email.trim() === '' ) {
			pro = false
		}
		if ( pro ) {
			fetch( '/api/subscribers', {
				method: 'post',
				body: JSON.stringify( {
					fullName: name,
					email: email
				} ),
				headers: {
					'Content-Type': 'application/json'
				}
			} ).then( res => {
				if ( res.status === 201 ) {
					setSuccess(true)
				} else {
					alert("Something is Wrong with Your input")
				}
			})
		} else {
			alert("All fields are Required!")
		}

		evt.preventDefault()
	}

	useEffect( () => {
		
		window.addEventListener( 'resize', ( win, evt ) => {
			setSize(window.innerWidth)
		} )
		
		fetch( '/api/about' )
			.then( res => res.json() )
			.then( json => setAbout( json ) )
		fetch("/api/partners")
			.then( res => res.json() )
			.then( json => setpartners( json ) )
		
	}, [])

	return (
		<>
			<hr />
				
			<footer className="text-white bg-dark p-4">
				<div className="dropdown-divider"></div>
				<div className="container">
					<Partners partners={partners} size={size} />
				</div>
				
				<div className="container-fluid">
					<div className="dropdown-divider"></div>
					<div className="row">
						<div className="col-md-3 text-center">
							<h6 className="text-center"><i>Important Links</i></h6>
							<Link to="/" className="btn btn-secondary btn-sm">
								Home
							</Link>
							<Link to="/events" className="btn btn-secondary btn-sm">
								Events
							</Link>
							<Link to="/history" className="btn btn-secondary btn-sm">
								History
							</Link>
							<Link to="/about" className="btn btn-secondary btn-sm">
								About
							</Link>
							<div className="dropdown-divider"></div>
							<Link to="/admin" className="btn btn-secondary btn-sm">
								Admin
							</Link>
							<br/>
						</div>
						<div className="col-md-6 text-center">
							<br/>
							<h6><i>Address</i></h6>
							{about && <div>
								<p>{about.address}</p>
								<a href={`mailto:${ about.email }`} className="btn btn-secondary btn-sm">
									{about.email}</a><br />
								<a href={`tel:${ about.email }`} className="btn btn-secondary btn-sm">
									{about.phone}</a><br />
							</div>}
							<br/>
						</div>
						<div className="col-md-3">
							<h6><i>Subscribe</i></h6>
							<form onSubmit={subscribe}>
								<input className="form-control" name="fullName" 
									placeholder="Enter Full Name" type="text" value={name}
									onChange={evt=>{setName(evt.target.value)}} />
								<input className="form-control" name="email" type="email" 
									placeholder="Enter Email Address" value={email}
									onChange={evt=>{setEmail(evt.target.value)}} />
								<input type="submit" className="btn btn-primary btn-sm btn-block"
									value="Subscribe" />
							</form>
							{success && <Success
								show={success}
								action="Subscribed To Our Updates"
								modalId="success"
								details="You will Receive timely updates about our upcoming events 
									and the Progress of the Current happens within the world of Sports
									events"
							/>}
							<br/>
						</div>					
					</div>
					<div className="dropdown-divider"></div>
					<div className="row text-center">
						<div className="col-12">
							<a className="btn btn-primary btn-sm" href="#root">
								<span className="fas fa-chevron-up"></span>
							</a>
							<hr/>
							<i>Ultimate Sports Events </i> 
							<i> Copyright &copy; {( new Date() ).getFullYear()}</i>
							
						</div>
					</div>
				</div>
			</footer>
		</>
	)
}

export default Footer
