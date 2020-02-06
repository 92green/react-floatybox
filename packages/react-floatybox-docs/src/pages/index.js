// @flow
import React from 'react';
import Page from 'component/Page';
import {H1} from 'dcme-style';
import {Box} from 'dcme-style/layout';
import {Text} from 'dcme-style/affordance';
import {Link} from 'dcme-style/affordance';
import IndexMdx from '../mdx/index.mdx';

export default () => {
    return <Page>
        <Box pt={[3,4]} px={[3,4]} pb="100rem" maxWidth="800px" margin="0 auto">
            <Box mb={4}>
                <Box>
                    <H1>react-floatybox 🎈🎁🎉</H1>
                </Box>
                <Text textStyle="monospace">See also <Link to="/dimensions">react-use-real-dimensions</Link></Text>
            </Box>
            <IndexMdx />
        </Box>
    </Page>;
};
