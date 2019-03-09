'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var routerMap = new Map();

var get = exports.get = function get(path) {
  return router({
    method: 'get',
    path: path
  });
};

var post = exports.post = function post(path) {
  return router({
    method: 'get',
    path: path
  });
};

var put = exports.put = function put(path) {
  return router({
    method: 'put',
    path: path
  });
};

var del = exports.del = function del(path) {
  return router({
    method: 'del',
    path: path
  });
};

var all = exports.all = function all(path) {
  return router({
    method: 'all',
    path: path
  });
};

var router = function router(opts) {
  return function (target, key) {
    routerMap.set(_extends({
      target: target
    }, opts), target[key]);
  };
};

var controller = exports.controller = function controller(path) {
  return function (target) {
    target.prototype['basePath'] = path;
  };
};

var Route = function () {
  function Route() {
    _classCallCheck(this, Route);
  }

  _createClass(Route, [{
    key: 'init',
    value: function init(router) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = routerMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref = _step.value;

          var _ref2 = _slicedToArray(_ref, 2);

          var conf = _ref2[0];
          var _controller = _ref2[1];

          var basePath = '';
          if (conf.target['basePath']) {
            basePath = conf.target['basePath'];
          }
          router[conf.method](basePath + conf.path, _controller);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return Route;
}();

exports.default = Route;
