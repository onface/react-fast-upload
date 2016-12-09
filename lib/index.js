import {Component} from "react" ;
import classNames from 'classnames';
import props from "./props" ;

import AjaxUpload from './ajaxUpload';
import IframeUpload from './iframeUpload';


class Upload extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }
    render () {
    	const self = this
    	const state = this.state
    	const props = this.props
        return (
        	<div>
	        {
	        	typeof window.FormData !== 'undefined' ? (<AjaxUpload {...props} />) : (<IframeUpload {...props} />)
	        }
	        </div>
        )
    }
}

Upload.defaultProps = props.defaultProps
Upload.propTypes = props.propTypes

export default Upload ;
module.exports = Upload