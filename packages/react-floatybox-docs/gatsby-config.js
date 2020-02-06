// @flow
const {gatsbyConfig} = require('dcme-gatsby/src/gatsby/gatsby-config');

module.exports = {
    siteMetadata: {
        title: 'React Floatybox Demo'
    },
    pathPrefix: '/react-floatybox',
    ...gatsbyConfig({
        compileModules: [`dcme-gatsby`, `dcme-style`]
    })
};
