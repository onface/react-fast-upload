import {Component} from "react" ;
import classNames from 'classnames';
import props from "./props" ;
import defaultRequest from './request';
import getUid from './uid';
import "./index.css" ;

class Upload extends Component {
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
        const { props } = self;
        let { data } = props;
        const { onStart } = props;
        if (typeof data === 'function') {
            data = data(file);
        }
        const { uid } = file;
        self.state[uid] = defaultRequest({
            action: props.action,
            filename: props.name,
            file,
            data,
            headers: props.headers,
            onProgress: e => {
                props.onProgress(e, file);
            },
            onSuccess: ret => {
                delete self.state[uid];
                props.onSuccess(ret, file);
            },
            onError: (err, ret) => {
                delete self.state[uid];
                props.onError(err, ret, file);
            },
        });
        onStart(file);
    }
    //重置
    reset() {
        this.setState({
            uid: getUid(),
        });
    }
    //取消
    abort(file) {
        const { reqs } = this;
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
            Object.keys(reqs).forEach((uid) => {
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
    	let self = this
    	let state = this.state 
    	let props = this.props
        return (
        	<span className={"upload "+props.css}>
                <input  type={props.name || 'file'} 
                        accept={props.accept} 
                        key={this.state.uid} 
                        className="upload-input" 
                        multiple={props.multiple} 
                        onChange={function(e){
                            self.onChange(e)}
                        }
                />
                {props.children}
            </span>
        )
    }
}
export default Upload ;
module.exports = Upload
