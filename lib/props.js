'use strict';

var _react = require('react');

var example = function example() {
    return arguments;
};

function empty() {}

module.exports = {
    defaultProps: {
        action: '/',
        // component: 'span',
        wrapClassName: 'rf',
        data: {},
        headers: {},
        type: 'file',
        multipart: true,
        onProgress: empty,
        onStart: empty,
        onError: empty,
        onSuccess: empty,
        multiple: false
    },
    propTypes: {
        action: _react.PropTypes.string,
        // component: PropTypes.string,
        wrapClassName: _react.PropTypes.string,
        data: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]),
        headers: _react.PropTypes.object,
        type: _react.PropTypes.string,
        accept: _react.PropTypes.string,
        onProgress: _react.PropTypes.func,
        onStart: _react.PropTypes.func,
        onError: _react.PropTypes.func,
        onSuccess: _react.PropTypes.func,
        multiple: _react.PropTypes.bool
    },
    propExample: {
        action: example('/upload', 'http://xxx.com'),
        wrapClassName: example('oneclassname otherclassname', 'elseclassname'),
        data: example({ a: 1 }, { b: 2, c: 3 }),
        type: example('file'),
        accept: example('image/*', 'video/*'),
        multipart: example(true, false),
        onStart: example(function (file) {
            console.log(file);
        }),
        onSuccess: example(function (res) {
            console.log(res);
        }),
        onProgress: example(function (step, file) {
            console.log(step);
            console.log(file);
        }),
        onError: example(function (err) {
            console.log(err);
        })
    },
    propsDesc: {
        action: 'upload path',
        wrapClassName: 'className',
        data: 'other data object to post',
        type: 'file type',
        headers: 'http headers to post, available in modern browsers',
        multipart: 'only support ie10+',
        accept: 'input accept attribute',
        onProgress: 'progress callback',
        onSuccess: 'success callback',
        onError: 'error callback'
    }
};