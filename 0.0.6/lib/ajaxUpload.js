"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _props = require("./props");

var _props2 = _interopRequireDefault(_props);

var _request = require("./request");

var _request2 = _interopRequireDefault(_request);

var _uid = require("./uid");

var _uid2 = _interopRequireDefault(_uid);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ajaxUpload = function (_Component) {
    _inherits(ajaxUpload, _Component);

    function ajaxUpload(props) {
        _classCallCheck(this, ajaxUpload);

        var _this = _possibleConstructorReturn(this, (ajaxUpload.__proto__ || Object.getPrototypeOf(ajaxUpload)).call(this, props));

        _this.state = {
            uid: (0, _uid2["default"])()
        };
        return _this;
    }

    _createClass(ajaxUpload, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.abort();
        }
        //拖拽

    }, {
        key: "onFileDrop",
        value: function onFileDrop(e) {
            if (e.type === 'dragover') {
                e.preventDefault();
                return;
            }

            var files = e.dataTransfer.files;
            this.uploadFiles(files);

            e.preventDefault();
        }
        //多个文件,分别发送post

    }, {
        key: "uploadFiles",
        value: function uploadFiles(files) {
            var len = files.length;
            for (var i = 0; i < len; i++) {
                var file = files[i];
                file.uid = (0, _uid2["default"])();
                this.post(file);
            }
        }
        //上传

    }, {
        key: "post",
        value: function post(file) {
            var self = this;
            var props = self.props;
            var data = props.data;
            // const  onStart  = props.onStart;
            if (typeof data === 'function') {
                data = data(file);
            }
            var uid = file.uid;
            self.state[uid] = (0, _request2["default"])({
                action: props.action,
                filename: props.name,
                file: file,
                data: data,
                headers: props.headers,
                onProgress: function onProgress(e) {
                    props.onProgress(e, file);
                },
                onSuccess: function onSuccess(ret) {
                    delete self.state[uid];
                    props.onSuccess(ret, file);
                },
                onError: function onError(err, ret) {
                    delete self.state[uid];
                    props.onError(err, ret, file);
                }
            });
            props.onStart(file);
        }
        //重置

    }, {
        key: "reset",
        value: function reset() {
            this.setState({
                uid: (0, _uid2["default"])()
            });
        }
        //取消

    }, {
        key: "abort",
        value: function abort(file) {
            var reqs = this.reqs;
            if (file) {
                var uid = file;
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

    }, {
        key: "onChange",
        value: function onChange(e) {
            var files = e.target.files;
            this.uploadFiles(files);
            this.reset();
        }
    }, {
        key: "render",
        value: function render() {
            var self = this;
            var state = this.state;
            var props = this.props;
            return require("react").createElement(
                "label",
                { className: props.clsp + '-upload-ajax' + ' ' + props.wrapClassName,
                    htmlFor: "rfUploadInput"
                },
                require("react").createElement("input", { id: "rfUploadInput",
                    type: props.type,
                    name: props.name,
                    accept: props.accept,
                    key: this.state.uid,
                    className: props.clsp + '-upload-ajax-input',
                    multiple: props.multiple,
                    onChange: function onChange(e) {
                        self.onChange(e);
                    }
                }),
                props.children
            );
        }
    }]);

    return ajaxUpload;
}(_react.Component);

ajaxUpload.defaultProps = _props2["default"].defaultProps;
ajaxUpload.propTypes = _props2["default"].propTypes;

exports["default"] = ajaxUpload;

module.exports = ajaxUpload;