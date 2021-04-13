/**
 * - Modified require does not throw when second arg ref >ERR_NO_THROW is provided
 * - It does not modify the global require 
 * - Doesnt provide Intellisense :((
 * @memberof module.require
 * @param {*} path
 * @param {*} ref
 */
function xrequire(path, ref) {
    const avail_refs = ['ERR_NO_THROW']
    const Mod = function () {}

    Mod.prototype = Object.create(module.constructor.prototype)
    Mod.prototype.constructor = module.constructor

    Mod.prototype.require = function (path, ref) {
        const self = this
        try {
            return self.constructor._load(path, self)
        } catch (err) {
            // NOTE magic if the ref has match instead of throw we return undefined
            if (ref !== undefined) {
                if (avail_refs.includes(ref)) return undefined
            }
            // if module not found, we have nothing to do, simply throw it back.
            if (err.code === 'MODULE_NOT_FOUND') {
                throw err
            }
        }
    }

    if (!(Mod.prototype.require instanceof require.constructor)) return undefined
    else return Mod.prototype.require(path, ref)
}

 //console.log(xrequire('../index','ERR_NO_THROW')) // our require
// require('.asas','ERR_NO_THROW') // err < not the same
module.exports = xrequire
