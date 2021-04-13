/**
 * - Example caveat on how to extend path-mapper to own use with personalized MapperModel
 */

const { MapperModel, pathMapper } = require('.')

/**
 * @CutomMapperModel
 * @extends MapperModel
 */
class CutomMapperModel extends MapperModel {
    constructor(params, debug, asNew) {
        super(params, debug, asNew)

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

const ppm = pathMapper(CutomMapperModel)

/**
 * @CustomPathMapper  ( global.pm )
 * @memberof pathMapper().get
 * - Grab currently available paths/data/statics from `global.pm` (path mapper) scope
 * - Custom declaration providing own `Custom{MapperModel}` model
 * @param {Object} CustomMapper provide own `Custom Mapper` extended from  `require('path-mapper').MapperModel`
 */
const pm = (debug = false) => {
    let pm = ppm.get(debug)
    if (!(pm instanceof CutomMapperModel)) return undefined
    return pm
}

exports.pathMapper = ppm
exports.CutomMapperModel = CutomMapperModel
exports.getter = pm

