import React from 'react'

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js'

import FroalaEditorComponent from 'react-froala-wysiwyg';

export default function Froala (props) {
	
	return (
		<FroalaEditorComponent
			{...props}
			tag="textarea"
    />
	)
}
