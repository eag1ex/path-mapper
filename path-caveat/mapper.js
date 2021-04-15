// practical example

// map any paths to point to your application
// execute this script before application starts

const allowForeignProps = true

require('../.').add(
    // NOTE replace this with `path-mapper`
    {
        megaProject: {
            megaPathA: '/some/path',
            megaPathB: '/some/path',
        },
        sideProject: {
            sidePathA: '/some/path',
            sidePathb: '/some/path',
            ws:{port:5000},
            zmq:{tcp:'tcp://'}
        },
    },
    allowForeignProps
)

// and call the getter() in your local build to assing paths where needed
// will target assigned paths if already assigned in outter npm packages