# ie8

<!-- Polyfills -->
<!--[if lt IE 10]>
<script src="../../_fastboot/lt-ie10.js"></script>
<![endif]-->
<!--[if lte IE 11]>
<script src="../../_fastboot/lte-ie11.js"></script>
<![endif]-->

<div id="demo"></div>
<pre id="printf"></pre>


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
			onStart(file) {
		        document.getElementById('printf').innerHTML +=  '\nonStart ' + file.name
		        // this.refs.inner.abort(file);
			},
			onSuccess(res) {
		        document.getElementById('printf').innerHTML +=  '\nonSuccess ' + res
		        // alert('onSuccess')
		        // alert(res)
			},
			onProgress(step, file) {
		        document.getElementById('printf').innerHTML +=  '\nonProgress ' + Math.round(step.percent) + ' '+ file.name
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
				<div>就不上传</div>
				<div>你点我啊</div>
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