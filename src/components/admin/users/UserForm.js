import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'


export default function Userform () {
	const { userId } = useParams()
	const [ user, setUser ] = useState( null )

	const [ fullName, setFullName ] = useState( '' )
	const [ fullNameErr, setFullNameErr ] = useState( '' )
	
	const [ email, setEmail ] = useState( '' )
	const [ emailErr, setEmailErr ] = useState( '' )
	
	const [ status, setStatus ] = useState( '' )
	const [ statusErr, setStatusErr ] = useState( '' )

	useEffect( () => {
		if ( userId ) {
			fetch('/api/users/'+userId)
				.then( res => res.json() )
				.then( json => {
					if ( json ) {
						setUser( json )	
						setFullName(json.fullName)
						setEmail(json.email)
						setStatus(json.status)
					}
				} )
		}
	}, [userId])
	
	const set = ( evt, fun, funErr ) => {
		let value = evt.target.value
		if ( value === '' ) {
			funErr( 'This Field is Required' )
		} else {
			funErr('')
		}
		fun( value )
	}

	const nameChange = ( evt ) => {
		set( evt, setFullName, setFullNameErr )
	}

	const emailChange = ( evt ) => {
		set(evt, setEmail, setEmailErr)
	}

	const statusChange = ( evt ) => {
		set(evt, setStatus, setStatusErr)
	}
	
	const save = (evt) => {
		let proceed = true
		if ( fullName.trim()==='' ) {
			setFullNameErr( 'Name Filed is required' )
			proceed = false
		} else {
			setFullNameErr( '' )
		}
		if ( email.trim()==='' ) {
			setEmailErr( 'Email Filed is required' )
			proceed = false
		} else {
			setEmailErr( '' )
		}
		if ( status.trim()==='' ) {
			setStatusErr( 'Status Filed is required' )
			proceed = false
		} else {
			setStatusErr( '' )
		}

		if ( proceed ) {
			let body = {
				fullName: fullName,
				email: email,
				status: status,
			}
			let path = userId ? '/' + userId : ''
			let code = userId ? 200 : 201
			fetch( '/api/users' + path, {
				method: 'post',
				body: JSON.stringify( body ),
				headers: {
					"Content-Type": "application/json"
				}
			} ).then( res => {
				if ( res.status === code ) {
					window.location = "/admin/users" 
				} else {
					alert("There was a problem submiting your Data")
				}
			} )
		}
		evt.preventDefault()
	}
	return (
		<>
			<div className="card-header">
				<div className="row">
					<div className="col-md-9">
						<h4>{user ? "Edit" : "Create"} A User</h4>
					</div>
					<div className="col-md-3 text-right">
						<Link to="/admin/users" className="btn btn-primary btn-sm" >
							Back
						</Link>
					</div>
				</div>
			</div>
			<div className="card-body">
				<form onSubmit={save} >
					<div className="form-group">
						<label htmlFor="fullName">Full Name</label>
						{fullNameErr && <small className="text-danger"> {fullNameErr} </small>}
						<input id="fullName" className="form-control"
							value={fullName} onChange={nameChange}/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email Address</label>
						{emailErr && <small className="text-danger"> {emailErr} </small>}
						<input id="email" className="form-control"
							value={email} onChange={emailChange}/>
					</div>
					<div className="form-group">
						<label htmlFor="status">Status</label>
						{statusErr && <small className="text-danger"> {statusErr} </small>}
						<select id="status" className="form-control"
							value={status} onChange={statusChange}>
							<option value="">-- Status --</option>
							<option value="Active">Active</option>
							<option value="Inactive">Inactive</option>
						</select>
					</div>

					<div className="text-right">
						<button type="submit" className="btn btn-success btn-sm">Save</button>
					</div>
				</form>
			</div>
		</>
	)
}
