import {
  promisify
} from 'util'
import fs from 'fs'
import {
  resolve
} from 'path'
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

/**
 * @param {any} obj
 * @return {booolean}
 */
export const isArray = obj => Array.isArray(obj)

/**
 * @param {object} obj
 * @return {booolean}
 */
export const hasOwnProperty = (target, key) => target.hasOwnProperty(key)

/**
 * @param {string} path
 */
export const exportFile = async path => {
  try {
    const files = await readdir(path)
    files.forEach(async filename => {
      let filePath = resolve(path + '/' + filename)
      try {
        var stats = fs.statSync(filePath)
        if (stats.isFile()) {
          require(filePath)
        } else if (stats.isDirectory()) {
          exportFile(filePath)
        }
      } catch (e) {
        console.log(e)
      }
    })
  } catch (e) {
    console.log(e)
  }
}
