"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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