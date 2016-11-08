# example

<div id="demo"></div>

````js
var Upload = require( 'react-fast-upload' );
import { Component } from "react" ;
import { render } from "react-dom" ;


class App extends Component {
	constructor ( props ) {
		super()
		this.state = {
	      action: '/',
	      data: { a: 1, b: 2 },
	      headers: {
	        Authorization: 'xxxxxxx',
	      },
	      multiple: true,
	      onStart: (file) => {
	        console.log('onStart', file.name);
	        // this.refs.inner.abort(file);
	      },
	      onSuccess(file) {
	        console.log('onSuccess', file);
	      },
	      onProgress(step, file) {
	        console.log('onProgress', Math.round(step.percent), file.name);
	      },
	      onError(err) {
	        console.log('onError', err);
	      },
	      css:'label'
	    }
	}
	change ( id ) {

	}
	render () {
		let self = this
		let state = this.state

		return (
			<Upload {...this.state} >
				<div>点击上传</div>
				<div>就不上传</div>
				<div>你点我啊</div>
			</Upload>
		)
	}
}
render(<App />,document.getElementById('demo'))
````


````css
.label{
	background-color:rgba(0,0,0,0.2);
}
````