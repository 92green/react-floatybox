// @flow
import React from 'react';
import Page from 'component/Page';
import {H1} from 'dcme-style';
import {ContentNav} from 'dcme-style';
import {Box} from 'dcme-style/layout';
import {Flex} from 'dcme-style/layout';
import {TextWrapper} from 'dcme-style/layout';
import {Icon} from 'dcme-style/affordance';
import {Text} from 'dcme-style/affordance';
import {Link} from 'dcme-style/affordance';
import IndexMdx from '../mdx/index.mdx';
import {styled} from 'dcme-style/core';

const SuperDuper = styled(H1)`
    color: #000;
    line-height: 3rem;
    text-shadow: -2px 2px 0px #f59a91, -3px 3px 0px #f6e7e5;
    font-size: 2.8rem;

    @media (min-width: ${props => props.theme.breakpoints[1]}) {
        text-shadow: -3px 3px 0px #f59a91, -6px 6px 0px #f6e7e5;
        line-height: 4rem;
        font-size: 3.2rem;
    }

    @media (min-width: ${props => props.theme.breakpoints[2]}) {
        font-size: 4rem;
    }
`;

export default () => {
    return <Page>
        <ContentNav>
            <Box pt={5} pb={2}>
                <Text as="div" textStyle="monospace">
                    <Flex alignItems="flex-end">
                        <Box mr={4}>
                            <SuperDuper>react-floatybox<Text textStyle="h2"> <Text style={{whiteSpace: 'nowrap', textShadow: 'none'}}>🎈🎁🎉</Text></Text></SuperDuper>
                        </Box>
                        <Box mr={3}>
                            <Link href="https://www.npmjs.com/package/react-floatybox"><Icon icon="npm" /> npm</Link>
                        </Box>
                        <Box>
                            <Link href="https://github.com/92green/react-floatybox"><Icon icon="github" /> github</Link>
                        </Box>
                    </Flex>
                </Text>
            </Box>
            <Box pb={4}>
                <Text textStyle="monospace">See also <Link to="/dimensions">react-use-real-dimensions</Link></Text>
            </Box>
        </ContentNav>
        <ContentNav
            pb={6}
            pageNav={[
                '# React Floatybox',
                'Demo',
                'Features',
                'Installation',
                'Usage',
                'Props',
                'Development'
            ]}
        >
            <TextWrapper>
                <IndexMdx />
            </TextWrapper>
        </ContentNav>
    </Page>;
};
