import {Component} from "react" ;
import classNames from 'classnames';
import props from "./props" ;
import defaultRequest from './request';
import getUid from './uid';
import "./index.css" ;

class ajaxUpload extends Component {
    constructor (props) {
        super(props)
        this.state = {
            uid: getUid(),
        }
    }
    componentWillUnmount() {
        this.abort();
    }
    //拖拽
    onFileDrop(e) {
        if (e.type === 'dragover') {
            e.preventDefault();
            return;
        }

        const files = e.dataTransfer.files;
        this.uploadFiles(files);

        e.preventDefault();
    }
    //多个文件,分别发送post
    uploadFiles(files) {
        const len = files.length;
        for (let i = 0; i < len; i++) {
            const file = files[i];
            file.uid = getUid();
            this.post(file);
        }
    }
    //上传
    post(file) {
        let self = this
        const  props  = self.props;
        let  data  = props.data;
        // const  onStart  = props.onStart;
        if (typeof data === 'function') {
            data = data(file);
        }
        const  uid  = file.uid;
        self.state[uid] = defaultRequest({
            action: props.action,
            filename: props.name,
            file,
            data,
            headers: props.headers,
            onProgress: function (e) {
                props.onProgress(e, file);
            },
            onSuccess: function (ret) {
                delete self.state[uid];
                props.onSuccess(ret, file);
            },
            onError: function (err, ret) {
                delete self.state[uid];
                props.onError(err, ret, file);
            },
        });
        props.onStart(file);
    }
    //重置
    reset() {
        this.setState({
            uid: getUid(),
        });
    }
    //取消
    abort (file) {
        const  reqs  = this.reqs;
        if (file) {
            let uid = file;
            if (file && file.uid) {
                uid = file.uid;
            }
            if (reqs[uid]) {
                reqs[uid].abort();
                delete reqs[uid];
            }
        } else {
            Object.keys(reqs).forEach(function (uid) {
                reqs[uid].abort();
                delete reqs[uid];
            });
        }
    }
    //选择文件
    onChange(e) {
        const files = e.target.files;
        this.uploadFiles(files);
        this.reset();
    }
    render () {
    	const self = this
    	const state = this.state 
    	const props = this.props
        return (
        	<label  className={props.clsp + '-upload'+' '+props.wrapClassName} 
                    htmlFor="rfUploadInput"
            >
                <input  id="rfUploadInput"
                        type={props.type} 
                        name={props.name}
                        accept={props.accept} 
                        key={this.state.uid} 
                        className={props.clsp + '-upload-input'}
                        multiple={props.multiple} 
                        onChange={function(e){
                            self.onChange(e)
                        }}
                />
                {props.children}
            </label>
        )
    }
}

ajaxUpload.defaultProps = props.defaultProps
ajaxUpload.propTypes = props.propTypes

export default ajaxUpload ;
module.exports = ajaxUpload
