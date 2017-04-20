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

var _ajaxUpload = require("./ajaxUpload");

var _ajaxUpload2 = _interopRequireDefault(_ajaxUpload);

var _iframeUpload = require("./iframeUpload");

var _iframeUpload2 = _interopRequireDefault(_iframeUpload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Upload = function (_Component) {
    _inherits(Upload, _Component);

    function Upload(props) {
        _classCallCheck(this, Upload);

        var _this = _possibleConstructorReturn(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Upload, [{
        key: "render",
        value: function render() {
            var self = this;
            var state = this.state;
            var props = this.props;
            return require("react").createElement(
                "div",
                null,
                typeof window.FormData !== 'undefined' ? require("react").createElement(_ajaxUpload2["default"], props) : require("react").createElement(_iframeUpload2["default"], props)
            );
        }
    }]);

    return Upload;
}(_react.Component);

Upload.defaultProps = _props2["default"].defaultProps;
Upload.propTypes = _props2["default"].propTypes;

exports["default"] = Upload;

module.exports = Upload;