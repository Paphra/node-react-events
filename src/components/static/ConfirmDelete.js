import React from 'react'

export default function ConfirmDelete (props) {
	return (
		<div className="modal fade" id={props.modalId} tabIndex="-1"
			role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div className="modal-dialog" role="document">
				<div className="modal-content border-danger text-danger">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">Delete {props.item}</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<p>Are You Sure You Want to Delete this {props.item}?</p>
						<p className="text-success"><i>{props.details}</i></p>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
						<button type="button" onClick={props.callback} className="btn btn-danger">Delete</button>
					</div>
				</div>
			</div>
		</div>
	)
}
