// @flow
const {gatsbyConfig} = require('dcme-gatsby/src/gatsby/gatsby-config');

module.exports = {
    siteMetadata: {
        title: 'React Floatybox Demo'
    },
    ...gatsbyConfig({
        compileModules: [`dcme-gatsby`, `dcme-style`]
    })
};
