// @ts-nocheck

const { objectSize, copy, isString, isClass,warn } = require('x-utils-es/umd')
const MapperModel = require('./MapperModel')
const {updateObjectLevels} = require('./utils')
const deepMerge = require('deepmerge')
/**
 * 
 * @param {*} CustomMapper 
 * @param {*} allowForeignProps force to allow properties not set by model schema
 */
const pathMapper = (CustomMapper,allowForeignProps=false) => {
    // assigning empty defaults, and static presets
    if (!global.pm) global.pm = {}

    return {
        /**
         * - Gets all available paths on `global.pm (path-mapper/MapperModel/CutomMapperModel)`
         * - Always returns all static props as per Model definition
         */
        get: (_allowForeignProps,debug = undefined) => {

            /** force to accept props not part of model schema, (offsets default settings) */
            _allowForeignProps = _allowForeignProps !== undefined ? _allowForeignProps : allowForeignProps
 
            if (CustomMapper) {
                if (isClass(CustomMapper) && CustomMapper.__entity==='MapperModel') {
                   
                    let mapper = new CustomMapper(global.pm, _allowForeignProps,false,debug).__update()
                    delete mapper.__updated
                    return mapper
                    
                } else {
                    if (debug) warn('[pathMapper]', 'CustomMapper must be extended from MapperModel, ..defaulting')
                }
            }
           
            let mapper = new MapperModel(global.pm, _allowForeignProps,false,debug).__update()
            delete mapper.__updated
            return mapper
                    
        },

        /**
         * - Add/update mapPaths to global.pm scope
         * - mapPaths must reference static presets set in `MapperModel{}` or your own declared via caveat, reffer to examples in `./caveat.example.js`
         * - Can extend when providing own `Custom{MapperModel}` from `pathMapper( Custom{MapperModel} )`
         * @param {Object} mapPath
         * @param {*} _allowForeignProps force to accept props not part of model schema, (offsets default settings)
         * @returns `Boolean`
         */
        add: (mapPath = {}, _allowForeignProps=undefined, debug = false) => {

            let allForeignProps = _allowForeignProps!==undefined ? _allowForeignProps:allowForeignProps
     
            if (!objectSize(mapPath)) return false
            let pmData
            if (CustomMapper) {
                if (isClass(CustomMapper) && CustomMapper.__entity === 'MapperModel') {
                    
                    let mapper = new CustomMapper(copy(mapPath),allForeignProps, false,debug).__update()
                    pmData = mapper         
                } else {
                    if (debug) warn('[pathMapper]', 'CustomMapper must be extended from MapperModel, ..defaulting')
                }
               
            } 
                
            if(CustomMapper && !pmData){
               if(debug) warn('[pathMapper]', 'CustomMapper must be extended from MapperModel, ..defaulting')
            }

            if(!pmData){    
                pmData = new MapperModel(copy(mapPath), allForeignProps,false,debug).__update()
            }
              
          
            if(!pmData) return false
            if (!pmData.__updated) return false

            delete pmData.__updated
          
            // make sure no undefineds are provided 
            mapPath = updateObjectLevels(copy(pmData))

            
            global.pm = {    
                // { global.pm } should always remain last, so first execution takes affect
                ...deepMerge.all([ mapPath, global.pm ])
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
const pm = (allowForeignProps,debug = false) => {
  
    let pm = pathMapper(null, true).get(allowForeignProps,debug)
    if (!(pm instanceof MapperModel)) return new MapperModel(global.pm || {}, allowForeignProps, false, debug).__update()
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
exports.add = (mapPath, allowForeignProps, debug)=> pathMapper(null,allowForeignProps).add(mapPath, debug)
exports.remove = pathMapper().remove
exports.pm = pm
exports.MapperModel = MapperModel
