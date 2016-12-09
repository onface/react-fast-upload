"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _props = require("./props");

var _props2 = _interopRequireDefault(_props);

var _uid = require("./uid");

var _uid2 = _interopRequireDefault(_uid);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var iframeUpload = function (_Component) {
    _inherits(iframeUpload, _Component);

    function iframeUpload(props) {
        _classCallCheck(this, iframeUpload);

        var _this = _possibleConstructorReturn(this, (iframeUpload.__proto__ || Object.getPrototypeOf(iframeUpload)).call(this, props));

        _this.state = {
            sending: false,
            uid: (0, _uid2["default"])(),
            response: {},
            step: {
                percent: 0
            },
            file: {
                name: ''
            }
        };
        return _this;
    }

    _createClass(iframeUpload, [{
        key: "ms",
        value: function ms(action) {
            var self = this;
            var state = this.state;
            var props = this.props;

            var _ret = function () {
                switch (action.type) {
                    case 'CHANGE_SENDING':
                        state.sending = action.data.sending;
                        break;
                    case 'START_SUBMIT':
                        state.file = action.data.file;
                        props.onStart(state.file);
                        break;
                    case 'CHANGE_SUCCESS':
                        state.response = action.data.response;
                        props.onSuccess(state.response);
                        break;
                    case 'CHANGE_FILENAME':
                        state.file = action.data.file;
                        break;
                    case 'CHANGE_PRECENT':
                        state.step.percent = action.data.percent;
                        break;
                    case 'PRECENT':
                        if (state.step.percent === 100) {
                            props.onProgress(state.step, self.state.file);
                            clearInterval(clock);
                            return {
                                v: void 0
                            };
                        }
                        if (state.sending) {
                            return {
                                v: void 0
                            };
                        }
                        var clock = setInterval(function () {
                            if (state.step.percent < 99) {
                                state.step.percent += 1;
                                props.onProgress(state.step, self.state.file);
                            } else {
                                clearInterval(clock);
                            }
                        }, 100);
                        break;
                    case "RESET":
                        state.uid = (0, _uid2["default"])();
                        break;
                }
            }();

            if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
            this.setState(state);
        }
    }, {
        key: "render",
        value: function render() {
            var self = this;
            var state = this.state;
            var props = this.props;
            return require("react").createElement(
                "div",
                { className: props.clsp + '-iframe' + ' ' + props.wrapClassName },
                require("react").createElement("iframe", { frameBorder: "0",
                    id: state.uid + "Iframe",
                    name: state.uid + "Iframe",
                    onLoad: function onLoad() {
                        var win = document.getElementById(state.uid + 'Iframe').contentWindow;
                        var response = win.document.body.innerText;
                        if (response) {
                            self.ms({
                                type: 'CHANGE_SENDING',
                                data: {
                                    sending: false
                                }
                            });
                            self.ms({
                                type: 'CHANGE_PRECENT',
                                data: {
                                    percent: 100
                                }
                            });
                            self.ms({
                                type: 'PRECENT'
                            });
                            self.ms({
                                type: 'CHANGE_SUCCESS',
                                data: {
                                    response: response
                                }
                            });
                        }
                    },
                    className: "rf-iframe-iframe"
                }),
                require("react").createElement(
                    "form",
                    { action: props.action, target: state.uid + "Iframe", method: "post", encType: "multipart/form-data", ref: "rfIframeForm" },
                    require("react").createElement(
                        "label",
                        { htmlFor: state.uid + "file",
                            className: props.clsp + '-iframe-content'
                        },
                        props.children
                    ),
                    require("react").createElement("input", { type: "file",
                        name: props.name,
                        id: state.uid + "file",
                        className: "rf-iframe-input",
                        disabled: state.sending,
                        onChange: function onChange(e) {
                            if (state.sending) {
                                return;
                            }
                            self.ms({
                                type: 'START_SUBMIT',
                                data: {
                                    file: {
                                        name: e.target.value
                                    }
                                }
                            });
                            self.refs.rfIframeForm.submit();
                            self.ms({
                                type: "CHANGE_FILENAME",
                                data: {
                                    file: {
                                        name: e.target.value
                                    }
                                }
                            });
                            self.ms({
                                type: 'CHANGE_PRECENT',
                                data: {
                                    percent: 0
                                }
                            });
                            self.ms({
                                type: 'PRECENT'
                            });
                            self.ms({
                                type: 'CHANGE_SENDING',
                                data: {
                                    sending: true
                                }
                            });
                        }
                    })
                )
            );
        }
    }]);

    return iframeUpload;
}(_react.Component);

iframeUpload.defaultProps = _props2["default"].defaultProps;
iframeUpload.propTypes = _props2["default"].propTypes;

exports["default"] = iframeUpload;

module.exports = iframeUpload;