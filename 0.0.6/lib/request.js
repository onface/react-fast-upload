'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = upload;
function getError(option, xhr) {
    var msg = 'cannot post ' + option.action + ' ' + xhr.status + '\'';
    var err = new Error(msg);
    err.status = xhr.status;
    err.method = 'post';
    err.url = option.action;
    return err;
}

function getBody(xhr) {
    var text = xhr.responseText || xhr.response;
    if (!text) {
        return text;
    }

    // try {
    //     return JSON.parse(text);
    // } catch (e) {
    return text;
    // }
}

/*
option {
  onProgress: (event: { percent: number }): void,
  onError: (event: Error, body?: Object): void,
  onSuccess: (body: Object): void,
  data: Object,
  filename: String,
  file: File,
  action: String,
  headers: Object,
}
*/
function upload(option) {
    var xhr = new XMLHttpRequest();
    var pro_e = void 0;
    if (xhr.upload) {
        xhr.upload.onprogress = function progress(e) {
            if (e.total > 0) {
                e.percent = Math.min(Math.floor(e.loaded / e.total * 100), 99);
            }
            pro_e = e;
            option.onProgress(e);
        };
    }

    var formData = new FormData();

    if (option.data) {
        Object.keys(option.data).map(function (key) {
            formData.append(key, option.data[key]);
        });
    }

    formData.append(option.filename, option.file);

    xhr.onerror = function error(e) {
        option.onError(e);
    };

    xhr.onload = function onload() {
        // allow success when 2xx status
        // see https://github.com/react-component/upload/issues/34
        if (xhr.status < 200 || xhr.status >= 300) {
            return option.onError(getError(option, xhr), getBody(xhr));
        }

        pro_e.percent = 100;
        option.onProgress(pro_e);
        option.onSuccess(getBody(xhr));
    };

    xhr.open('post', option.action, true);

    var headers = option.headers || {};

    // when set headers['X-Requested-With'] = null , can close default XHR header
    // see https://github.com/react-component/upload/issues/33
    if (headers['X-Requested-With'] !== null) {
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }

    for (var h in headers) {
        if (headers.hasOwnProperty(h) && headers[h] !== null) {
            xhr.setRequestHeader(h, headers[h]);
        }
    }
    xhr.send(formData);

    return {
        abort: function abort() {
            xhr.abort();
        }
    };
}