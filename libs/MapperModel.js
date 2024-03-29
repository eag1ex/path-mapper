const { warn, isObject } = require('x-utils-es/umd')
const { assingThis } = require('./utils')



/**
 * - Provide configuration settings we can map for exporting your configiguration
 * - If providing paths or data that belong to specific project/package please assing to {project} first
 * - Use the same name in camelCase as it appears on package.js
 * @param {*} params
 * @param {*} allowForeignProps Allow adding properties that do no exist in current Model schema
 * @param {*} asNew only create empty ConfigModel
 * @param {*} debug
 */
class MapperModel {
    constructor(params = {}, allowForeignProps=false, asNew = false, debug) {
        if(!isObject(params)) params = {}
        // statics
        MapperModel.__opts = {
            params,
            debug,
            asNew,
            allowForeignProps
        }

        // Some preset projects can be added
        this.base = undefined
        this.path = undefined
        this.root = undefined

        // NOTE _update must be called after declaration, also when extending 
    }

    __update() {
        // assing values only when all static props aavailable
        let inx = assingThis.apply(this, [MapperModel.__opts.params, MapperModel.__opts.asNew,MapperModel.__opts.allowForeignProps])

        // post value that gets set when up updated something
        this.__updated = undefined

        if (MapperModel.__opts.debug && !MapperModel.__opts.asNew) {
            if (!inx) warn('[MapperModel]', 'no mapping was found, check static presets, or any new project paths nto updated ?')
        }

        if (inx && !MapperModel.__opts.asNew) this.__updated = true
        return this
    }

    /** Static value */
    static get __entity() {
        return 'MapperModel'
    }
}


module.exports = MapperModel
