import {Component} from "react" ;
import classNames from 'classnames';
import props from "./props" ;
import getUid from './uid';

import "./index.css" ;

class iframeUpload extends Component {
    constructor (props) {
        super(props)
        this.state = {
            sending:false,
            uid:getUid(),
            response:{},
            step:{
                percent:0
            },
            file:{
                name:''
            },
        }
    }
    ms(action){
        const self = this
        let state = this.state
        let props = this.props
        switch(action.type) {
            case 'CHANGE_SENDING':
                state.sending = action.data.sending
            break
            case 'START_SUBMIT':
                state.file = action.data.file
                props.onStart(state.file)
            break
            case 'CHANGE_SUCCESS':
                state.response = action.data.response
                props.onSuccess(state.response)
            break
            case 'CHANGE_FILENAME':
                state.file = action.data.file
            break
            case 'CHANGE_PRECENT':
                state.step.percent = action.data.percent
            break
            case 'PRECENT':
                if(state.step.percent === 100){
                    props.onProgress(state.step, self.state.file)
                    clearInterval(clock);
                    return
                }
                if(state.sending){
                    return
                }
                let clock = setInterval(function(){
                    if(state.step.percent < 99){
                        state.step.percent += 1
                        props.onProgress(state.step, self.state.file)
                    }else{
                        clearInterval(clock);
                    }
                },100)
            break
            case "RESET":
                state.uid = getUid()
            break
        }
        this.setState(state)
    }
    render () {
    	const self = this
    	const state = this.state 
    	const props = this.props
        return (
	        <div className={props.clsp + '-upload-iframe'+' '+props.wrapClassName}>
                <iframe frameBorder="0" 
                        id={"Iframe"+state.uid} 
                        name={"Iframe"+state.uid}
                        onLoad={function(){
                            const win = document.getElementById('Iframe'+state.uid).contentWindow
                            const response = win.document.body.innerText
                            if(response){
                                self.ms({
                                    type:'CHANGE_SENDING',
                                    data:{
                                        sending:false
                                    }
                                })
                                self.ms({
                                    type:'CHANGE_PRECENT',
                                    data:{
                                        percent:100
                                    }
                                })
                                self.ms({
                                    type:'PRECENT'
                                })
                                self.ms({
                                    type:'CHANGE_SUCCESS',
                                    data:{
                                        response:response
                                    }
                                })
                            }
                        }}
                        className="rf-upload-iframe-iframe"
                ></iframe>
                <form action={props.action} target={"Iframe"+state.uid} method="post"   encType="multipart/form-data" ref={"rfIframeForm"+state.uid}>
                    <input  type="file"  
                            name={props.name} 
                            id={"file"+state.uid} 
                            className="rf-upload-iframe-input"
                            disabled={state.sending}
                            onChange={function(e){
                                if(state.sending){
                                    return
                                }
                                self.ms({
                                    type:'START_SUBMIT',
                                    data:{
                                        file:{
                                            name:e.target.value
                                        }
                                    }
                                })
                                self.refs['rfIframeForm'+state.uid].submit()
                                self.ms({
                                    type:"CHANGE_FILENAME",
                                    data:{
                                        file:{
                                            name:e.target.value
                                        },
                                    }
                                })
                                self.ms({
                                    type:'CHANGE_PRECENT',
                                    data:{
                                        percent:0
                                    }
                                })
                                self.ms({
                                    type:'PRECENT'
                                })
                                self.ms({
                                    type:'CHANGE_SENDING',
                                    data:{
                                        sending:true
                                    }
                                })
                            }}
                    />
                    <label  htmlFor={"file"+state.uid} 
                            className={props.clsp + '-upload-iframe-content'} 
                    >{props.children}</label>
                </form>
            </div>
        )
    }
}

iframeUpload.defaultProps = props.defaultProps
iframeUpload.propTypes = props.propTypes

export default iframeUpload ;
module.exports = iframeUpload

