# example

<!-- Polyfills -->
<!--[if lt IE 10]>
<script src="../../_fastboot/lt-ie10.js"></script>
<![endif]-->
<!--[if lte IE 11]>
<script src="../../_fastboot/lte-ie11.js"></script>
<![endif]-->


<div id="demo"></div>


````js

var Upload = require( 'react-fast-upload' );
import { Component } from "react" ;
import { render } from "react-dom" ;


class App extends Component {
	constructor ( props ) {
		super()
		this.upload_props = {
			name:'file',
			clsp:'rf',
			action: '/upload',
			data: { a: 1, b: 2 },
			headers: {
		        Authorization: 'xxxxxxx',
			},
			multiple: true,
			onStart(file) {
		        console.log('onStart', file.name);
		        // 取消上传
		        return false
			},
			onSuccess(res) {
		        console.log('onSuccess', res);
			},
			onProgress(step, file) {
		        console.log('onProgress', Math.round(step.percent), file.name);
			},
			onError(err) {
		        console.log('onError', err);
			},
			wrapClassName:'elseclassname'
		}
		this.state = {
	    }
	}
	render () {
		let self = this
		let state = this.state
		return (
			<Upload {...this.upload_props} >
				<div>点击上传</div>
			</Upload>
		)
	}
}
render(<App />,document.getElementById('demo'))


````


````css
.elseclassname{
	background-color:rgba(0,0,0,0.2);
	display:inline-block;
}
````