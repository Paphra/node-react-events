import React from 'react'

export default function Success ( props ) {
	let show = ''
	let disp = 'none'
	if ( props.show ) {
		show =  'show' 
		disp ='block'
	}

	const hide = ( evt ) => {
		document.getElementById(props.modalId).style = "display: none"
	}

	return (
		<div className={`modal fade ${show}`} id={props.modalId} tabIndex="-1"
			role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"
			style={{display: disp, padding: "15px"}}
		>
			<div className="modal-dialog" role="document">
				<div className="modal-content border-success text-success">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">Successfully {props.action}</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<p className="text-primary"><i>{props.details}</i></p>
					</div>
					<div className="modal-footer">
						<button type="button" onClick={hide}
							className="btn btn-danger btn-sm">Okay</button>
					</div>
				</div>
			</div>
		</div>
	)
}
