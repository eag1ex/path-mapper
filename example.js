
//PathMapperMainExample()
//NOTE assigned path data on global scope at: `global.pm{...}`, refer to MapperModer for Intellisense
function PathMapperMainExample() {
    const { add, pm, remove, MapperModel } = require('./')
    // force to accept props not part of model schema
    const allowForeignProps = true
    
    const paths= {
        root:'project/',
        path:'project/source/asset',
    }

    const another= {
       base:'project/source',
        customPathByforce:'custom/secret'
    }

    add(paths,allowForeignProps) // returns boolean
   add(another,allowForeignProps) // returns boolean
   // remove('root') // path removed
    console.log(pm(false))
}



PathMapperCaveatExtended()
// NOTE  assigned path data on global scope at: `global.pm{...}`, refer to MapperModer for Intellisense
function PathMapperCaveatExtended() {
    const { CutomMapperModel, getter, pathMapper } = require('./caveat.example')

    const allowForeignProps = true
    const mapPaths = {

        root:'project/',
        base:'project/source',
        path:'project/source/asset',

        megaProject: {
            megaPathA: '/path1/path2',
            megaPathB: '/path1/path2',
            secretPath:'custom/path'
        }
    }

    const another = {
        sideProject: {
            sidePathA: '/path3/path4',
            sidePathb: '/path3/path4',
            sidePathc:{
                another:'a/b'
            }
         
        },
        customPathByforce:'custom/secret'
    }

    pathMapper.add(mapPaths,allowForeignProps)
    pathMapper.add(another,true)
    pathMapper.remove('base')
 
    console.log(getter())
}
