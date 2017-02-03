# some Upload 多个上传组件


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
			<div>
				<h2>demo1</h2>
				<Upload {...{
					action: '/upload',
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
					}
				}} >
					<button>button</button>
				</Upload>
				<h2>demo2</h2>
				<div className="demo2">
					<Upload {...{
						action: '/upload',
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
						}
					}} >
						<div className="demo2-cnt">
							<div className="demo2-cnt-help" onClick={function(e){
								e.preventDefault();//阻止默认事件(兼容IE8)
								e.stopPropagation();//阻止冒泡事件
							}}>help?</div>
							<div className="demo2-cnt-btn">+</div>
							<div className="demo2-cnt-tip">"help?"已阻止冒泡事件<br/>试试点击灰色区域吧</div>
						</div>
					</Upload>
				</div>
			</div>
		)
	}
}
render(<App />,document.getElementById('demo'))


````


````css
.demo2{
	width:200px;
	height:200px;
	display:block;
	margin-left:auto;
	margin-right:auto;
	position:relative;
}
.demo2:before{
	content:'防止块状元素的margin区域也能点击上传,外侧需再套一层div';
	position:absolute;
	top:50px;
	left:-300px;
	font-size:16px;
	color:#333;
	width:200px;
}
.demo2-cnt{
	display:block;
	padding-top:50px;
	padding-bottom:50px;
	width:200px;
	height:100px;
	border:2px solid #333;
	border-radius:5px;
	position:relative;
	margin-left:auto;
	margin-right:auto;
	background-color: #aaa;
}
.demo2-cnt-help{
	position: absolute;
	top: 5px;
	right: 5px;
	width: 50px;
	height: 50px;
	background-color: #fff;
	border-radius: 50%;
	display: inline-block;
	text-align: center;
	line-height: 50px;
	cursor:help;
}
.demo2-cnt-help:hover + .demo2-cnt-btn + .demo2-cnt-tip{
	display:block; 
}
.demo2-cnt-tip{ 
	height: 50px;
	line-height: 25px;
	text-align: center;
	display: none;
}
.demo2-cnt-btn{
	display: block;
	height: 90px;
	text-align: center;
	font-size: 70px;
}
````