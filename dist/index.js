'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.required = exports.convert = exports.controller = exports.all = exports.use = exports.del = exports.put = exports.post = exports.get = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _util = require('./util');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var routerMap = new Map();

var get = exports.get = function get(path) {
  return router({
    method: 'get',
    path: path
  });
};

var post = exports.post = function post(path) {
  return router({
    method: 'post',
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
    method: 'delete',
    path: path
  });
};

var use = exports.use = function use(path) {
  return router({
    method: 'use',
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

var convert = exports.convert = function convert(middleware) {
  return function (target, key, descriptor) {
    if (!(0, _util.isArray)(target[key])) {
      target[key] = [target[key]];
    }
    target[key].unshift(middleware);
    return descriptor;
  };
};

var required = exports.required = function required(rules) {
  return convert(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
      var missing, hasError, request, _loop, k;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              missing = {};
              hasError = false;
              request = ctx.request;

              if ((0, _util.hasOwnProperty)(rules, 'params')) {
                request.params = ctx.params;
              }

              _loop = function _loop(k) {
                var errs = [];
                rules[k].forEach(function (item) {
                  if (!request[k] || !request[k][item]) {
                    errs.push(item);
                  }
                });
                if (errs.length) {
                  missing[k] = errs.join(',') + ' is required';
                  hasError = true;
                }
              };

              for (k in rules) {
                _loop(k);
              }

              if (!hasError) {
                _context.next = 9;
                break;
              }

              ctx.body = {
                statusCode: 400,
                error: "Bad Request",
                message: missing
              };
              return _context.abrupt('return', missing);

            case 9:
              _context.next = 11;
              return next();

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
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
          var _ref2 = _step.value;

          var _ref3 = _slicedToArray(_ref2, 2);

          var conf = _ref3[0];
          var _controller = _ref3[1];

          var basePath = '';
          if (conf.target['basePath']) {
            basePath = conf.target['basePath'];
          }
          if (!(0, _util.isArray)(_controller)) {
            _controller = [_controller];
          }
          router[conf.method].apply(router, [basePath + conf.path].concat(_toConsumableArray(_controller)));
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
  }, {
    key: 'setRouterPath',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(path) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _util.exportFile)(path);

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setRouterPath(_x3) {
        return _ref4.apply(this, arguments);
      }

      return setRouterPath;
    }()
  }, {
    key: 'setRouterPathAndInit',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(path, router) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _util.exportFile)(path);

              case 2:
                this.init(router);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function setRouterPathAndInit(_x4, _x5) {
        return _ref5.apply(this, arguments);
      }

      return setRouterPathAndInit;
    }()
  }]);

  return Route;
}();

exports.default = Route;