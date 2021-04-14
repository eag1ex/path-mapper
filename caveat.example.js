/**
 * - Example caveat on how to extend path-mapper to own use with personalized MapperModel
 */

const { MapperModel, pathMapper } = require('.')

/**
 * @CutomMapperModel
 * @extends MapperModel
 */
class CutomMapperModel extends MapperModel {
    constructor(params, allowForeignProps, asNew,debug) {
        super(params, allowForeignProps, asNew,debug)
        
        // provide own caveat mapper here so intellisense can be visible
        this.megaProject = {
            megaPathA: undefined,
            megaPathB: undefined,
        }
        this.sideProject = {
            sidePathA: undefined,
            sidePathb: undefined,
        }
        // must be called after all props are declared
        this.__update()
    }
}
/**
 * Allow adding properties that do no exist in current Model schema
 */
const allowForeignProps = true

//NOTE  Important part where we apply changes to the plugin and export it as caveat
const ppm = pathMapper(CutomMapperModel,allowForeignProps)

/**
 * @CustomPathMapper  ( global.pm )
 * @memberof pathMapper().get
 * - Grab currently available paths/data/statics from `global.pm` (path mapper) scope
 * - Custom declaration providing own `Custom{MapperModel}` model
 * @param {Object} CustomMapper provide own `Custom Mapper` extended from  `require('path-mapper').MapperModel`
 */
const pm = (_allowForeignProps,debug = false) => {
    let pm = ppm.get(_allowForeignProps,debug)
    if (!(pm instanceof CutomMapperModel)) return undefined
    return pm
}

exports.pathMapper = ppm
exports.CutomMapperModel = CutomMapperModel
exports.getter = pm

