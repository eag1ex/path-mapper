
const {objectSize, isObject, isFunction,copy} = require('x-utils-es/umd')

/**
 * - assing/update this in class scope 
 * - method extends the class
 * @param {*} params 
 * @param 
 */
exports.assingThis = function(params={},asNew, allowForeignParams){
    let inx = 0
    params = copy(params)
    const thisHasKey = (match)=>{
        let keys = Object.keys(this)
        return keys.filter(n=>n===match).length
    }

    Object.entries(this).forEach(([k, val1]) => {
        if(k==='__updated' || k==='__entity' || k==='__update' || k==='__opts') return
        if(isFunction(val1)) return
        // only create empty model
        if (asNew) return      
        if (thisHasKey(k) && params[k]) {
            // assign values to multi level on the object
            if(objectSize(params[k]) && isObject(params[k]) && isObject(this[k])){         
                Object.entries(this[k]).forEach(([kk,val2])=>{
                    if(isFunction(val2)) return
                    if(params[k][kk]!==undefined && this[k]){
                        this[k][kk] = params[k][kk]
                        inx++
                    }
                },{})
            }
            // assing value to 1 level object
            else if(!isObject(params[k]) && thisHasKey(k) && !isObject(this[k])){
                if(isFunction(this[k])) return
                this[k] = params[k]
                inx++
            }
        }
    })

    if (allowForeignParams) {
        Object.entries(params).forEach(([k, val1]) => {
            if (asNew) return
            if (isFunction(this[k])) return
            if (k === '__updated' || k === '__entity' || k === '__update' || k === '__opts') return
           
            if (isObject(val1)) {          
                Object.entries(val1).forEach(([kk, val2]) => {
                   if(!this[k]) this[k]={}
                   this[k][kk] = val2
                   inx++
                })
            }
            else if(!this[k] && val1) {
                
                this[k] = val1
                inx++
            }
        })
    }

    return inx
}


/**
 * Update all Object levels, and make sure nested undefineds are not exported
 * @param {*} data{} 
 */
const updateObjectLevels = (data = {}) => {
    let n = {}
    function iterate(obj) {
        for (let k in obj) {
            if (obj.hasOwnProperty(k)) {
                if (typeof obj[k] == 'object') {
                    if (objectSize(obj[k])) n[k] = obj[k]
                    iterate(obj[k])
                } 
            }
        }
    }
    iterate(data)

    for (let k in data) {
        if(!isObject(data[k])) n[k]=data[k]
    }

    return n
}

exports.updateObjectLevels = updateObjectLevels

