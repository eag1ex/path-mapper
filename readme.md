## Path Mapper 
####  [ Developed by Eaglex ](http://eaglex.net)

##### LICENSE
* LICENCE: CC BY-NC-ND
* SOURCE: _(https://creativecommons.org/licenses/by-nc-nd/4.0/)_


### About
For targeting external resources and paths in local builds
- When mapping files or configs to/from node_module npm packages to local build project
- When using alternative files or configs instead of local ones we provide path or require() with data from that location


#### Example
You have a project that uses external config instead of local, so you want to grab that file or data  instead. Or you need a different path to a file that is not from local build, and looking to external resources for local build usage.

- `pm,add,remove` are part `pathMapper()`, can be exported   

```js
const {xrequire,pm,add,cpm, remove,MapperConfigModel,pathMapper} = require('path-mapper')

/**
* 
**/
pm() instanceof MapperModel // true


/**
 * - Member or node.js module.require
 * - will not throw error when module is not found, and return `undefined`
 * - does not modify the global require
**/
xrequire('./indexsde4','ERR_NO_THROW') // returns undefined


/**
 * @pm
 * - gets all available paths from global.pm and returns it as a model of MapperConfigModel{}
 * @returns `MapperConfigModel{}` mapped paths via ( global.pm )
**/

pm()


/**
 * @CustomPathMapper  ( global.pm )
 * @memberof pathMapper().get
 * - Grab currently available paths/data/statics from `global.pm` (path mapper) scope
 * - Custom declaration providing own `Custom{MapperModel}` model
 * - usage without Caveat export
 * @param {Object} CustomMapper provide own `Custom Mapper` extended from  `require('path-mapper').MapperModel`
 * @returns `CustomMapper{}` mapped paths via ( global.pm )
 */

cpm(CustomMapper) 
pm() instanceof CustomMapper // true



/**
 * Add project or prop to global.pm ( path mapper ) that is configured to accept those properties in MapperConfigModel{}
 * @param projectOrProp
 * @returns `boolean`
**/
add(projectOrProp)


/**
 * - Removes projectOrProp by name from global.pm scope
 * @returns `boolean`
**/
remove(prop)

  
  
// non extended caveat example:     
const paths= {
    root:'project/',
    base:'project/source',
    path:'project/source/asset',
}

add(paths) // returns boolean
remove('root') // returns boolean

pm()
/** returns:
    MapperModel {
    base: 'project/source',
    path: 'project/source/asset',
    root: undefined
    }

**/

```


#### Exporting caveat example:
Extended Caveat from `Path Mapper` located in `./caveat.example.js`.
- We want to be able to get Intellisense on exported paths so we know what is being mapped. When using caveat you are extending base `MapperModel` with your own, caveat example shows how to do it. 

```js
    const {CutomMapperModel, getter, pathMapper} = require('./caveat.example') // << extended from `path-mapper`
    // add absolute file paths that can be targeted

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

    // add global path somethere in your project outter  
    pathMapper.add(mapPaths) // returns true

    // adding another to a different project
    pathMapper.add(another) // returns true

    pathMapper.remove('root') // remove path from (global) global.pm scope 

    // get all paths by calling from your current project
    // provides Intellisense
    getter() // instanceof CutomMapperModel
    /** returns:
        CutomMapperModel {
            base: 'project/source',
            path: 'project/source/asset',
            root: undefined,
            megaProject: { megaPathA: '/path1/path2', megaPathB: '/path1/path2' },
            sideProject: { sidePathA: '/path3/path4', sidePathb: '/path3/path4' }
        }
    **/
    getter() instanceof CutomMapperModel // true

```


#### Contact

Have questions, or would like to submit feedback, **contact me at:** (https://eaglex.net/app/contact?product=path-mapper )

#### Thank you