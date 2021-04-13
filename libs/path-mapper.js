// @ts-nocheck

const { objectSize, copy, isString, isClass,warn } = require('x-utils-es/umd')
const MapperModel = require('./MapperModel')
const {updateObjectLevels} = require('./utils')

const pathMapper = (CustomMapper) => {
    // assigning empty defaults, and static presets
    if (!global.pm) global.pm = {}

    return {
        /**
         * - Gets all available paths on `global.pm (path-mapper/MapperModel/CutomMapperModel)`
         * - Always returns all static props as per Model definition
         */
        get: (debug = false) => {
            if (CustomMapper) {
                if (isClass(CustomMapper) && CustomMapper.__entity==='MapperModel') {
                    let mapper = new CustomMapper(global.pm, debug).__update()
                    delete mapper.__updated
                    return mapper
                    
                } else {
                    if (debug) warn('[pathMapper]', 'CustomMapper must be extended from MapperModel, ..defaulting')
                }
            }
            let mapper = new MapperModel(global.pm, debug).__update()
            delete mapper.__updated
            return mapper
                    
        },

        /**
         * - Add/update mapPaths to global.pm scope
         * - mapPaths must reference static presets set in `MapperModel{}` or your own declared via caveat, reffer to examples in `./caveat.example.js`
         * - Can extend when providing own `Custom{MapperModel}` from `pathMapper( Custom{MapperModel} )`
         * @param {Object} mapPath
         * @returns `Boolean`
         */
        add: (mapPath = {}, debug = false) => {
            if (!objectSize(mapPath)) return false
            let pmData
            if (CustomMapper) {
                if (isClass(CustomMapper) && CustomMapper.__entity === 'MapperModel') {
                    let mapper = new CustomMapper(copy(mapPath), debug).__update()
                    pmData = mapper         
                } else {
                    if (debug) warn('[pathMapper]', 'CustomMapper must be extended from MapperModel, ..defaulting')
                }
               
            } 
                
            if(CustomMapper && !pmData){
               if(debug) warn('[pathMapper]', 'CustomMapper must be extended from MapperModel, ..defaulting')
            }

            if(!pmData){
                pmData = new MapperModel(copy(mapPath), debug).__update()
            }

            if(!pmData) return false
            if (!pmData.__updated) return false

            delete pmData.__updated
            
            // make sure no undefineds are provided 
            mapPath = updateObjectLevels(copy(pmData))

           

            global.pm = {
                ...global.pm,
                ...mapPath,
            }
            return true
        },

        /**
         * - Provide propName to remove from `global.pm`
         * - Can also directly remove it by `delete global.pm[propName]`
         * @param {*} propName
         * @returns {*} `Boolean`
         */
        remove: (propName = '') => {
            if (!isString(propName)) return false
            if (global.pm[propName]) {
                delete global.pm[propName]
                return true
            }
            return false
        },
    }
}

/**
 * @PathMapper ( global.pm )
 * @memberof pathMapper().get
 * - Grab currently available paths/data/statics from `global.pm` (path mapper) scope
 */
const pm = (debug = false) => {
    let pm = pathMapper().get(debug)
    if (!(pm instanceof MapperModel)) return new MapperModel(global.pm || {}, false).__update()
    return pm
}


/**
 * @CustomPathMapper  ( global.pm )
 * @memberof pathMapper().get
 * - Grab currently available paths/data/statics from `global.pm` (path mapper) scope
 * - Custom declaration providing own `Custom{MapperModel}` model
 * - usage without Caveat export
 * @param {Object} CustomMapper provide own `Custom Mapper` extended from  `require('path-mapper').MapperModel`
 */
const cpm = (CustomMapper, debug = false) => {
    return pathMapper(CustomMapper).get(debug)
}

exports.cpm = cpm
exports.xrequire = require('./xrequire')
exports.pathMapper = pathMapper
exports.add = pathMapper().add
exports.remove = pathMapper().remove
exports.pm = pm
exports.MapperModel = MapperModel
