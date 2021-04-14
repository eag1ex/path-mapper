
const {objectSize, isObject} = require('x-utils-es/umd')
let n = {
    a:{
        b:false,
        c:{d:false}
    },
    b:'hello'
}

function iterate(obj) {
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            if (typeof obj[k] == 'object') {            
                iterate(obj[k])
            } 
            else if(!obj[k]){
                delete obj[k]
            }          
        }
    }
}
iterate(n)

console.log(n)