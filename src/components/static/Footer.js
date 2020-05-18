import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Footer () {
	
	const [ name, setName ] = useState( '' )
	const [ email, setEmail ] = useState( '' )
	
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
					alert("You have Successfully Subscribed to Our Updates")
				} else {
					alert("Something is Wrong with Your input")
				}
			})
		} else {
			alert("All fields are Required!")
		}

		evt.preventDefault()
	}
	return (

		<>
			<footer className="text-white bg-dark p-4">
				<div className="dropdown-divider"></div>
				<div className="container-fluid">
        	<div className="row">
						
						<div className="col-md-3 text-center">
							<h6 className="text-center"><i>Important Links</i></h6>
							<Link to="/" className="btn btn-success btn-block btn-sm">
								Home
							</Link>
							<Link to="/events" className="btn btn-outline-success btn-block btn-sm">
								Events
							</Link>
							<Link to="/history" className="btn btn-success btn-block btn-sm">
								History
							</Link>
							<Link to="/about" className="btn btn-primary btn-block btn-sm">
								About
							</Link>
							<Link to="/admin" className="btn btn-success btn-block btn-sm">
								Admin
							</Link>
						</div>
						<div className="col-md-3">
							
						</div>
						<div className="col-md-3">
							
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
								<input type="submit" className="btn btn-primary btn-sm btn-block" value="Subscribe" />
							</form>
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
