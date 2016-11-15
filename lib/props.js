import {PropTypes} from "react"

var example = function () {return arguments;}

function empty() {
}

module.exports = {
    defaultProps: {
        name:'',
        action:'/',
        // component: 'span',
        clsp:'rf',
        wrapClassName:'classname',
        data: {},
        headers: {},
        type : 'file',
        multiple: true,
        onProgress: empty,
        onStart: empty,
        onError: empty,
        onSuccess: empty,
        // supportServerRender: false,

    },
    propTypes: {
        name: PropTypes.string,
        clsp: PropTypes.string,
        action: PropTypes.string,
        // component: PropTypes.string,
        wrapClassName:PropTypes.string,
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
        name: example(
            '/upload',
            'http://xxx.com'
        ),
        clsp: example(
            'rf',
            'm'
        ),
        wrapClassName:example(
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
        multiple : example(
            true,
            false
        ),
        onStart : example(
            function (file) {
                console.log(file)
            },
        ),
        onSuccess : example(
            function (res) {
                console.log(res)
            },
        ),
        onProgress : example(
            function (step, file) {
                console.log(step)
                console.log(file)
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
        name:' file name',
        clsp:'replace className prefix',
        wrapClassName:'className',
        data: 'other data object to post',
        type:'file type',
        headers:'http headers to post, available in modern browsers',
        multiple:'only support ie10+',
        accept:'input accept attribute',
        onProgress: 'progress callback' ,
        onSuccess: 'success callback' ,
        onError: 'error callback' ,
    }
}