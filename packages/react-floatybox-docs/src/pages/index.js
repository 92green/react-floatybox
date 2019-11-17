// @flow
import React from 'react';
import Page from 'component/Page';
import {H2} from 'dcme-style';
import {Box} from 'dcme-style/layout';
import {Flex} from 'dcme-style/layout';
import {Link} from 'dcme-style/affordance';
import {Text} from 'dcme-style/affordance';

import FloatyBox from 'react-floatybox';

export default () => <Page>
    <Flex flexDirection="column" height="100%" p={[3,4]}>
        <Box mb={[3,4]}>
            <H2>It's React Floatybox Time 🎈🎁🎉</H2>
        </Box>
        <Box flexGrow="1">
            <Text>Some text and then a <FloatyBoxPopout /></Text>
        </Box>
    </Flex>
</Page>;
