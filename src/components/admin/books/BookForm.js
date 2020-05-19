import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import ConfirmDelete from '../../static/ConfirmDelete'

export default function Bookform () {
	const { bookId } = useParams()
	const [ book, setBook ] = useState( null )

	const [ fullName, setFullName ] = useState( '' )
	const [ fullNameErr, setFullNameErr ] = useState( '' )
	
	const [ email, setEmail ] = useState( '' )
	const [ emailErr, setEmailErr ] = useState( '' )
	
	const [ status, setStatus ] = useState( '' )
	const [ statusErr, setStatusErr ] = useState( '' )

	useEffect( () => {
		if ( bookId ) {
			fetch('/api/books/'+bookId)
				.then( res => res.json() )
				.then( json => {
					if ( json ) {
						setBook( json )	
						setFullName(json.fullName)
						setEmail(json.email)
						setStatus(json.status)
					}
				} )
		}
	}, [bookId])
	
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
			setFullNameErr( 'Name is required' )
			proceed = false
		} else {
			setFullNameErr( '' )
		}
		if ( email.trim()==='' ) {
			setEmailErr( 'Email is required' )
			proceed = false
		} else {
			setEmailErr( '' )
		}
		if ( status.trim()==='' ) {
			setStatusErr( 'Status is required' )
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
			let path = bookId ? '/' + bookId : ''
			let code = bookId ? 200 : 201
			fetch( '/api/books' + path, {
				method: 'post',
				body: JSON.stringify( body ),
				headers: {
					"Content-Type": "application/json"
				}
			} ).then( res => {
				if ( res.status === code ) {
					window.location = "/admin/books" 
				} else {
          return res.json()
				}
      } ).then( json => {
					alert("There was a problem submiting your Data | " + json.error)
      })
		} else {
			alert("Your Data Has erors, Please Correct them.")
		}
		evt.preventDefault()
	}
	const handleDelete = ( evt ) => {
		fetch( "/api/books/" + bookId, {
			method: 'delete'
		} ).then( res => {
			if ( res.status === 200 ) {
				window.location = "/admin/books"
			}
		})
	}
	return (
		<>
			<div className="card-header">
				<div className="row">
					<div className="col-9">
						<h4>{book ? "Edit" : "Create"} A Book</h4>
					</div>
					<div className="col-3 text-right">
						<Link to="/admin/books" className="btn btn-primary" >
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
							type="text" value={fullName} onChange={nameChange}
							placeholder="Full Book's Name"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email Address</label>
						{emailErr && <small className="text-danger"> {emailErr} </small>}
						<input id="email" className="form-control"
							type="email" value={email} onChange={emailChange}
							placeholder="email@example.com"
						/>
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

					<div className="text-center">
						{ book && <><button type="button" data-toggle="modal" data-target="#delete"
							className="btn btn-danger">Delete</button> 
							<ConfirmDelete
								modalId="delete" item="Book"
								callback={handleDelete} details={`Book's Email: ${book.email}`} />
							</>
						}
						<button type="submit" className="btn btn-success">Save</button>
					</div>
				</form>
			</div>
		</>
	)
}
