'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportFile = exports.hasOwnProperty = exports.isArray = undefined;

var _util = require('util');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var readdir = (0, _util.promisify)(_fs2.default.readdir);
var stat = (0, _util.promisify)(_fs2.default.stat);

/**
 * @param {any} obj
 * @return {booolean}
 */
var isArray = exports.isArray = function isArray(obj) {
  return Array.isArray(obj);
};

/**
 * @param {object} obj
 * @return {booolean}
 */
var hasOwnProperty = exports.hasOwnProperty = function hasOwnProperty(target, key) {
  return target.hasOwnProperty(key);
};

/**
 * @param {string} path
 */
var exportFile = exports.exportFile = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(path) {
    var files;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return readdir(path);

          case 3:
            files = _context2.sent;

            files.forEach(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(filename) {
                var filePath, stats;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        filePath = (0, _path.resolve)(path + '/' + filename);

                        try {
                          stats = _fs2.default.statSync(filePath);

                          if (stats.isFile()) {
                            require(filePath);
                          } else if (stats.isDirectory()) {
                            exportFile(filePath);
                          }
                        } catch (e) {
                          console.log(e);
                        }

                      case 2:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }());
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);

            console.log(_context2.t0);

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function exportFile(_x) {
    return _ref.apply(this, arguments);
  };
}();