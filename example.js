
PathMapperMainExample()
//NOTE assigned path data on global scope at: `global.pm{...}`, refer to MapperModer for Intellisense
function PathMapperMainExample() {
    const { add, pm, remove, MapperModel } = require('./')

    const paths= {
        root:'project/',
        path:'project/source/asset',
    }

    const another= {
        base:'project/source',
    }

    add(paths) // returns boolean
    add(another) // returns boolean

    remove('root') // path removed
    console.log(pm())
}



PathMapperCaveatExtended()
// NOTE  assigned path data on global scope at: `global.pm{...}`, refer to MapperModer for Intellisense
function PathMapperCaveatExtended() {
    const { CutomMapperModel, getter, pathMapper } = require('./caveat.example')

    const mapPaths = {

        root:'project/',
        base:'project/source',
        path:'project/source/asset',

        megaProject: {
            megaPathA: '/path1/path2',
            megaPathB: '/path1/path2',
        }
    }

    const another = {
        sideProject: {
            sidePathA: '/path3/path4',
            sidePathb: '/path3/path4',
        }
    }

    pathMapper.add(mapPaths)
    pathMapper.add(another)
    pathMapper.remove('base')
 
    console.log(getter())
}
