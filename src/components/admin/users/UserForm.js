import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import FileBase64 from 'react-file-base64'
import sha1 from 'sha1'

import ConfirmDelete from '../../static/ConfirmDelete'

export default function Userform (props) {
	const { userId } = useParams()
	const [ user, setUser ] = useState( null )
	const [ partners, setParteners ] = useState( [] )
	const users = props.users

	const [ firstName, setFirstName ] = useState( '' )
	const [ firstNameErr, setFirstNameErr ] = useState( '' )
	
	const [ lastName, setLastName ] = useState( '' )
	const [ lastNameErr, setLastNameErr ] = useState( '' )
	
	const [ email, setEmail ] = useState( '' )
	const [ emailErr, setEmailErr ] = useState( '' )
	
	const [ phone, setPhone ] = useState( '' )
	const [ phoneErr, setPhoneErr ] = useState( '' )
	
	const [ username, setUsername ] = useState( '' )
	const [ usernameErr, setUsernameErr ] = useState( '' )
	
	const [ password, setPassword ] = useState( '' )
	const [ confirmPassword, setConfirmPassword ] = useState( '' )
	const [ passwordErr, setPasswordErr ] = useState( '' )
	
	const [ admin, setAdmin ] = useState( false )
	
	const [ image, setImage ] = useState( '' )
	const [ imageErr, setImageErr ] = useState( '' )
	
	const [ partner, setPartner ] = useState( '' )
	const [ partnerErr, setPartnerErr ] = useState( '' )
	
	const [ status, setStatus ] = useState( '' )
	const [ statusErr, setStatusErr ] = useState( '' )

	const passwordChange = ( evt ) => {
		setPassword( evt.target.value )
		if ( confirmPassword !== '' && confirmPassword !== evt.target.value ) {
			setPasswordErr('Password Missmatch!')
		} else {
			setPasswordErr('')
		}
	}

	const passwordCheck = ( evt ) => {
		setConfirmPassword( evt.target.value )
		if ( password !== evt.target.value ) {
			setPasswordErr('Password Missmatch!')
		} else {
			setPasswordErr('')
		}
	}

	useEffect( () => {
		if ( userId ) {
			fetch('/api/users/'+userId)
				.then( res => res.json() )
				.then( json => {
					if ( json ) {
						setUser( json )	
						setFirstName(json.firstName)
						setLastName(json.lastName)
						setPhone(json.phone)
						setEmail(json.email)
						setAdmin(json.admin)
						setImage( json.image )
						setUsername(json.username)
						setPassword( json.password )
						setConfirmPassword(json.password)
						setPartner(json.partner._id)
						setStatus(json.status)
					}
				} )
		}
		fetch( '/api/partners' )
			.then( res => res.json() )
			.then( json => {setParteners(json)})
	}, [userId])
	
	const save = (evt) => {
		let proceed = true
		if ( firstName.trim()==='' ) {
			setFirstNameErr( 'First Name is required' )
			proceed = false
		} else {
			setFirstNameErr( '' )
		}
		if ( lastName.trim()==='' ) {
			setLastNameErr( 'Last Name is required' )
			proceed = false
		} else {
			setLastNameErr( '' )
		}
		
		if ( phone.trim()==='' ) {
			setPhoneErr( 'Phone Number is required' )
			proceed = false
		} else {
			setPhoneErr( '' )
		}
		if ( email.trim()==='' ) {
			setEmailErr( 'Email is required' )
			proceed = false
		} else {
			setEmailErr( '' )
		}
		if ( image.trim()==='' ) {
			setImageErr( 'Image is required' )
			proceed = false
		} else {
			setImageErr( '' )
		}
		if ( username.trim()==='' ) {
			setUsernameErr( 'Username is required' )
			proceed = false
		} else {
			setUsernameErr( '' )
			users.map( u => {
				if ( u.username === username ) {
					if ( user ) {
						if ( user.username !== username ) {
							setUsernameErr( 'Username Already Exists!' )
							proceed = false
						}
					} else {
						setUsernameErr( 'Username Already Exists!' )
						proceed = false
					}
				}
				return null;
			})
		}
		if ( password.trim()==='' ) {
			setPasswordErr( 'Password is required' )
			proceed = false
		} else {
			setPasswordErr( '' )
		}

		if ( password !== confirmPassword ) {
			proceed = false
		}
		if ( partner.trim()==='' ) {
			setPartnerErr( 'Partner is required' )
			proceed = false
		} else {
			setPartnerErr( '' )
		}

		if ( status.trim()==='' ) {
			setStatusErr( 'Status is required' )
			proceed = false
		} else {
			setStatusErr( '' )
		}

		if ( proceed ) {
			let hashPassword = sha1(password)
			if ( user ) {
				if ( password === user.password ) {
					hashPassword = password
				}
			}
			let body = {
				firstName: firstName,
				lastName: lastName,
				email: email,
				phone: phone,
				admin: admin,
				username: username,
				password: hashPassword,
				partner: partner,
				image: image,
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
		fetch( "/api/users/" + userId, {
			method: 'delete'
		} ).then( res => {
			if ( res.status === 200 ) {
				window.location = "/admin/users"
			}
		})
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
						<div className="row">
							<div className="col-md-6">
								<label htmlFor="firstName">First Name</label>
								{firstNameErr && <small className="text-danger"> {firstNameErr} </small>}
								<input id="firstName" className="form-control" type="text"
									value={firstName} onChange={evt => { setFirstName( evt.target.value ) }}
									placeholder="First Name"
								/>
							</div>
							<div className="col-md-6">
								<label htmlFor="lastName">Last Name</label>
								{lastNameErr && <small className="text-danger"> {lastNameErr} </small>}
								<input id="lastName" className="form-control" type="text"
									value={lastName} onChange={evt => { setLastName( evt.target.value ) }}
									placeholder="Last Name"
								/>
							</div>
						</div>
					</div>
					
					<div className="form-group">
						<div className="row">
							<div className="col-md-6">
								<label htmlFor="phone">Phone Number</label>
								{phoneErr && <small className="text-danger"> {phoneErr} </small>}
								<input id="phone" className="form-control" type="tel"
									value={phone} onChange={evt => { setPhone( evt.target.value ) }}
									placeholder="Telephone Number"
								/>
							</div>
							<div className="col-md-6">
								<label htmlFor="email">Email Address</label>
								{emailErr && <small className="text-danger"> {emailErr} </small>}
								<input id="email" className="form-control" type="email"
									value={email} onChange={evt => { setEmail( evt.target.value ) }}
									placeholder="email@example.com"
								/>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-md-6">
								<label htmlFor="username">Username</label>
								{usernameErr && <small className="text-danger"> {usernameErr} </small>}
								<input id="username" className="form-control" type="tel"
									value={username} onChange={evt => { setUsername( evt.target.value ); setUsernameErr('') }}
									placeholder="Enter Username"
								/>
							</div>
							<div className="col-md-6">
								<label htmlFor="admin">Is Admin</label>
								<select id="status" className="form-control"
									value={admin} onChange={evt=>{setAdmin(evt.target.value)}}>
									<option value={false}>No</option>
									<option value={true}>Yes</option>
								</select>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-md-6">
								<label htmlFor="password">Password</label>
								<input id="password" className="form-control" type="password"
									value={password} onChange={passwordChange}
									placeholder="Enter Password"
								/>
							</div>
							<div className="col-md-6">
								<label htmlFor="confirmPassword">Confirm Password</label>
								<input id="confirmPassword" className="form-control" type="password"
									value={confirmPassword} onChange={passwordCheck}
									placeholder="Confirm Password"
								/>
							</div>
							<div className="col-12 text-center">
								{passwordErr && <small className="text-danger"> {passwordErr} </small>}
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-md-6">
								<label htmlFor="status">Partner</label>
								{partnerErr && <small className="text-danger"> {partnerErr} </small>}
								<select id="status" className="form-control"
									value={partner} onChange={evt=>{setPartner(evt.target.value)}}>
									<option value={null}>-- Partner --</option>
									{partners && partners.map( ( partner, index ) => {
										return <option key={index} value={partner._id}>{partner.name}</option>
									})}
								</select>
							</div>
							<div className="col-md-6">
								<label htmlFor="status">Status</label>
								{statusErr && <small className="text-danger"> {statusErr} </small>}
								<select id="status" className="form-control"
									value={status} onChange={evt=>{setStatus(evt.target.value)}}>
									<option value="">-- Status --</option>
									<option value="Active">Active</option>
									<option value="Inactive">Inactive</option>
								</select>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-md-6">
								<label htmlFor="image">Logo/Image</label>
								{imageErr && <small className="text-danger"> {imageErr} </small>}
								<div className="form-control">
									<FileBase64
										multiple={false}
										onDone={data=>{setImage(data.base64)}}
										className="form-control"
									/>
								</div>
								<div className="text-center"
									id="image-preview">
									{image && <img className="img img-rounded" src={image} width="90%" alt="Partner" />}		
								</div>
								
							</div>
							<div className="col-md-6">
								<hr/>
								<div className="text-center">
									{user && <><button type="button" data-toggle="modal" data-target="#delete"
										className="btn btn-danger">Delete</button>
										<ConfirmDelete
											modalId="delete" item="User"
											callback={handleDelete} details={`Username: ${user.name}`} />
										</>
									}
									<button type="submit" className="btn btn-success">Save</button>
								</div>
							</div>
						</div>
					</div>
					
				</form>
			</div>
		</>
	)
}
