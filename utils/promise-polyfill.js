/**
 * 添加Promise.finally
 * 小程序不支持DOM，所以不能用bluebird，只能用es-promise
 */
var Promise = require('./es6-promise.js')

if (typeof Promise !== 'function') {
  throw new TypeError('A global Promise is required')
}
if (typeof Promise.prototype.finally !== 'function') {
  var speciesConstructor = function (O, defaultConstructor) {
    if (!O || (typeof O !== 'object' && typeof O !== 'function')) {
      throw new TypeError('Assertion failed: Type(O) is not Object')
    }
    var C = O.constructor
    if (typeof C === 'undefined') {
      return defaultConstructor
    }
    if (!C || (typeof C !== 'object' && typeof C !== 'function')) {
      throw new TypeError('O.constructor is not an Object')
    }
    var S = typeof Symbol === 'function' && typeof Symbol.species === 'symbol' ? C[Symbol.species] : undefined
    if (S == null) {
      return defaultConstructor
    }
    if (typeof S === 'function' && S.prototype) {
      return S
    }
    throw new TypeError('no constructor found')
  }

  var shim = {
    finally (onFinally) {
      var handler = typeof onFinally === 'function' ? onFinally : () => { }
      var C
      var newPromise = Promise.prototype.then.call(
        this, // throw if IsPromise(this) is not true
        x => new C(resolve => resolve(handler())).then(() => x),
        e => new C(resolve => resolve(handler())).then(() => { throw e })
      )
      C = speciesConstructor(this, Promise) // throws if SpeciesConstructor throws
      return newPromise
    }
  }
  Object.defineProperty(Promise.prototype, 'finally', { configurable: true, writable: true, value: shim.finally })
}
