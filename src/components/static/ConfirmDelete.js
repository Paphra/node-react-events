import React from 'react'

export default function ConfirmDelete (props) {
	return (
		<div class="modal fade" id={props.modalId} tabindex="-1"
			role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content border-danger text-danger">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Delete {props.item}</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<p>Are You Sure You Want to Delete this {props.item}?</p>
						<p className="text-success"><i>{props.details}</i></p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						<button type="button" onClick={props.callback} class="btn btn-danger">Delete</button>
					</div>
				</div>
			</div>
		</div>
	)
}
