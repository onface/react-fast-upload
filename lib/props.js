import {PropTypes} from "react"
var example = function () {return arguments;}

function empty() {
}

module.exports = {
    defaultProps: {
        action:'/',
        // component: 'span',
        css:'',
        data: {},
        headers: {},
        type : 'file',
        multipart: true,
        onProgress: empty,
        onStart: empty,
        onError: empty,
        onSuccess: empty,
        multiple: false,
        // supportServerRender: false,

    },
    propTypes: {
        action: PropTypes.string,
        // component: PropTypes.string,
        css:PropTypes.string,
        data: PropTypes.oneOfType([
          PropTypes.object,
          PropTypes.func,
        ]),
        headers: PropTypes.object,
        type: PropTypes.string,
        accept: PropTypes.string,
        onProgress: PropTypes.func,
        onStart: PropTypes.func,
        onError: PropTypes.func,
        onSuccess: PropTypes.func,
        multiple: PropTypes.bool,
        // supportServerRender: PropTypes.bool,
    },
    propExample: {
        action: example(
            '/upload',
            'http://xxx.com'
        ),
        css:example(
            'oneclassname otherclassname',
            'elseclassname'
        ),
        data: example(
            {a:1},
            {b:2,c:3}
        ),
        type: example(
            'file',
        ),
        accept: example(
            'image/*',
            'video/*'
        ),
        multipart : example(
            true,
            false
        ),
        onProgress : example(
            function (progress) {
                console.log(progress)
            },
        ),
        onSuccess : example(
            function (res) {
                console.log(res)
            },
        ),
        onError : example(
            function (err) {
                console.log(err)
            },
        ),
    },
    propsDesc: {
        action: 'upload path',
        css:'className',
        data: 'other data object to post',
        type:'file type',
        headers:'http headers to post, available in modern browsers',
        multipart:'only support ie10+',
        accept:'input accept attribute',
        onProgress: 'progress callback' ,
        onSuccess: 'success callback' ,
        onError: 'error callback' ,
    }
}