# select Upload 选择-上传(分段操作)

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
		this.state = {
			demo1_files:{},
			refLists:[]
	    }
	}
	render () {
		let self = this
		let state = this.state
		return (
			<div>
				<h2></h2>
				<Upload {...{
					action: '/upload',
					autoUpload:false,
					showInput:true,
					data:{a:1,b:2},
					files:self.state.demo1_files,
					onStart(file) {
				        console.log('onStart', file.name);
				        // this.refs.inner.abort(file);
					},
					onSuccess(res) {
				        console.log('onSuccess', res);
					},
					onProgress(step, file) {
				        console.log('onProgress', Math.round(step.percent), file.name);
					},
					onError(err) {
				        console.log('onError', err);
				        alert(err)
					},
					waitingList(refLists){
						console.log(refLists)
						self.setState({
							refLists:refLists
						})
					},
				}} >
				</Upload>
				<button onClick={function(){
					let dom = self.state.refLists[0]
					console.log(dom)
					console.log(self.refs[dom])
				}}>上传</button>
			</div>
		)
	}
}
render(<App />,document.getElementById('demo'))


````


````css
````