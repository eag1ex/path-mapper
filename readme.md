## Path Mapper 
####  [ Developed by Eaglex ](http://eaglex.net)

##### LICENSE
* LICENCE: CC BY-NC-ND
* SOURCE: _(https://creativecommons.org/licenses/by-nc-nd/4.0/)_


### About
For targeting external resources and paths in local builds

* When mapping files or configs to/from node_module npm packages to local build project
* When using alternative files or configs instead of local ones we provide path or require() with data from that location


#### Example
You have a project that uses external config instead of local, so you want to grab that file or data  instead. Or you need a different path to a file that is not from local build, and looking to external resources for local build usage.

* `pm,add,remove` are part `pathMapper()`, can be exported   

```js
const {xrequire,pm,add,cpm, remove,MapperConfigModel,pathMapper} = require('path-mapper')

// ---- non extended caveat example:   

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

pm()
/** returns:
    MapperModel {
    base: 'project/source',
    path: 'project/source/asset',
    root: undefined
    }

**/


/**
 * - gets all available paths from global.pm and returns it as a model of MapperConfigModel{}
 * @param allowForeignProps force return all available props, not just those set by model schema. It is usefull when we add() paths elsewhere in application that do not belong and we want to see what they are
 * @param debug // to check warning
 * @returns `MapperConfigModel{}` mapped paths via ( global.pm )
**/
pm(true) 

pm() instanceof MapperModel // true

/**
 * - Member or node.js module.require
 * - will not throw error when module is not found, and return `undefined`
 * - does not modify the global require
**/
xrequire('./indexsde4','ERR_NO_THROW') // returns undefined



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
cpm() instanceof CustomMapper // true



/**
 * Add project or prop to global.pm ( path mapper ) that is configured to accept those properties in MapperConfigModel{}
 * @param projectOrProp
 * @param allowForeignProps force to accept props not part of model schema
 * @returns `boolean`
**/
add(projectOrProp,allowForeignProps)


/**
 * @param propName target by name from global.pm scope
 * @param debug // to check warning
 * @returns `boolean`
**/
remove(propName,debug)

  

```


#### Exporting caveat example:
Extended Caveat from `Path Mapper` located in `./path-caveat`.

* We want to be able to get Intellisense on exported paths so we know what is being mapped. When using caveat you are extending base `MapperModel` with your own, caveat example shows how to do it. 

```js
    const {CutomMapperModel, getter, pathMapper} = require('./path-caveat') // << extended from `path-mapper`
    // add absolute file paths that can be targeted

    const allowForeignProps = true
    const mapPaths = {

        root:'project/',
        base:'project/source',
        path:'project/source/asset',
        megaProject: {
            megaPathA: '/path1/path2',
            megaPathB: '/path1/path2',
            secretPath: 'custom/path' // path not part of Custom model schema can be added when {allowForeignProps} is set
        }
    }

    const another = {
        sideProject: {
            sidePathA: '/path3/path4',
            sidePathb: '/path3/path4',
            secretPath: 'custom/path2' // not added because {allowForeignProps} wasnt set!
        }
    }

    // add global path somethere in your project outter  
    pathMapper.add(mapPaths,allowForeignProps) // returns true

    // adding another to a different project
    pathMapper.add(another,false) // returns true

    pathMapper.remove('root') // remove path from (global) global.pm scope 

    // get all paths by calling from your current project
    // provides Intellisense
    getter() // instanceof CutomMapperModel
    /** returns:
        CutomMapperModel {
            base: 'project/source',
            path: 'project/source/asset',
            root: undefined,
            megaProject: { megaPathA: '/path1/path2', megaPathB: '/path1/path2', secretPath: 'custom/path' },
            sideProject: { sidePathA: '/path3/path4', sidePathb: '/path3/path4' }
        }
    **/
    getter() instanceof CutomMapperModel // true


    // getter() is an alias of pm() which has a global setting to disallow output of custom paths that do not exist on model schema, we just need to set `pm(true)` which will ignore {allowForeignProps} conditions 

```


#### Contact

Have questions, or would like to submit feedback, **contact me at:** (https://eaglex.net/app/contact?product=path-mapper )

#### Thank you