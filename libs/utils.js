
const {objectSize, isObject, isFunction} = require('x-utils-es/umd')

/**
 * - assing/update this in class scope 
 * - method extends the class
 * @param {*} params 
 */
exports.assingThis = function(params={},asNew){
    let inx = 0

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
    return inx
}


/**
 * Update all Object levels, and make sure nested undefineds are not exported
 * @param {*} data{} 
 */
const updateObjectLevels = (data={})=>{
    let n={}
    function iterate(obj) {
        for (let k in obj) {
            if (obj.hasOwnProperty(k)) {
                if (typeof obj[k] == "object" ) {
                    if(objectSize( obj[k]))  n[k] = obj[k]
                    iterate(obj[k]);
                } else {
                    if( obj[k]!==undefined) n[k] = obj[k]                 
                }
            }
        }
    }
    iterate(data)
   return n
}

exports.updateObjectLevels = updateObjectLevels

