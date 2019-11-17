// @flow
import type {Node} from 'react';

import React from 'react';
import Helmet from 'react-helmet';
import {Head} from 'dcme-style/theme';
import {Theme} from 'dcme-style/theme';
import {Box} from 'dcme-style/layout';
import {mdxComponents} from 'dcme-style/core';
import {MDXProvider} from '@mdx-js/react';

type Props = {
    children: *
};

export default ({children}: Props): Node => <Box height="100%">
    <Helmet>
        <meta charSet="utf-8" />
        <title>React Floatybox Demo</title>
    </Helmet>
    <Head />
    <MDXProvider components={mdxComponents}>
        <Theme>
            {children}
        </Theme>
    </MDXProvider>
</Box>;
