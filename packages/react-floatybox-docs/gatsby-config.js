// @flow
const {gatsbyConfig} = require('dcme-gatsby/src/gatsby/gatsby-config');

module.exports = {
    siteMetadata: {
        title: 'React Floatybox'
    },
    pathPrefix: '/react-floatybox',
    ...gatsbyConfig({
        compileModules: [`dcme-gatsby`, `dcme-style`]
    })
};
