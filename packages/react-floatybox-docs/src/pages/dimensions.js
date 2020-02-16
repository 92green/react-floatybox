// @flow
import React from 'react';
import Page from 'component/Page';
import {H1} from 'dcme-style';
import {Box} from 'dcme-style/layout';
import {Text} from 'dcme-style/affordance';
import {Link} from 'dcme-style/affordance';
import {ContentNav} from 'dcme-style';
import {Flex} from 'dcme-style/layout';
import {TextWrapper} from 'dcme-style/layout';
import {Icon} from 'dcme-style/affordance';
import {styled} from 'dcme-style/core';

const SuperDuper = styled(H1)`
    color: #000;
    line-height: 2.7rem;
    text-shadow: -2px 2px 0px #f59a91, -3px 3px 0px #f6e7e5;
    font-size: 2.3rem;

    @media (min-width: ${props => props.theme.breakpoints[1]}) {
        text-shadow: -2px 2px 0px #f59a91, -4px 4px 0px #f6e7e5;
        line-height: 3.5rem;
        font-size: 2.7rem;
    }
`;

import useDimensions from 'react-use-dimensions';
import useRealDimensions from 'react-use-real-dimensions';

const CrampedBox = styled.div`
    margin: 2rem auto;
    width: 100px;
    border: 3px #444 dashed;
    box-sizing: content-box;
`;

export default () => {

    const [useDimensionsRef, dimensions] = useDimensions();
    const [useRealDimensionsRef, realDimensions] = useRealDimensions();

    return <Page>
        <ContentNav>
            <Box pt={5} pb={2}>
                <Text as="div" textStyle="monospace">
                    <Flex alignItems="flex-end">
                        <Box mr={4}>
                            <SuperDuper>react-use-real-dimensions<Text textStyle="h2"> <Text style={{whiteSpace: 'nowrap', textShadow: 'none'}}>🕊️↔😌</Text></Text></SuperDuper>
                        </Box>
                        <Box mr={3}>
                            <Link href="https://www.npmjs.com/package/react-use-real-dimensions"><Icon icon="npm" /> npm</Link>
                        </Box>
                        <Box>
                            <Link href="https://github.com/92green/react-floatybox/tree/master/packages/react-use-real-dimensions"><Icon icon="github" /> github</Link>
                        </Box>
                    </Flex>
                </Text>
            </Box>
            <Box pb={4}>
                <Text textStyle="monospace">See also <Link to="/">react-floatybox</Link></Text>
            </Box>
        </ContentNav>
        <ContentNav
            pb={6}
            pageNav={[
                '# react-use-real-dimensions',
                'Demo',
                'Installation',
                'Usage'
            ]}
        >
            <TextWrapper>
                <Box>
                    <Box mb={3}>
                        <Text as="p">So <Link href="https://github.com/Swizec/useDimensions">react-use-dimensions</Link> will measure your rendered elements in place.</Text>
                    </Box>
                    <Box mb={3}>
                        <Text as="p">But <Text textStyle="strong">react-use-real-dimensions</Text> will measure your elements in isolation, unconstrained by the rest of the page layout.</Text>
                    </Box>
                </Box>
                <Box mt={5} mb={4}>
                    <Text as="h3" textStyle="h3" id="demo">Demo</Text>
                </Box>
                <Box mt={4} mb={3}>
                    <Text as="p">Text in a 100px wide box:</Text>
                </Box>
                <CrampedBox>
                    <div ref={useDimensionsRef}>Aw dude you're cramping my style</div>
                </CrampedBox>
                <Box>
                    <Text as="p" textStyle="monospace">react-use-dimensions - width: {dimensions.width && dimensions.width.toFixed(1)}, height: {dimensions.height && dimensions.height.toFixed(1)}</Text>
                </Box>
                <CrampedBox>
                    <div ref={useRealDimensionsRef}>Aw dude you're cramping my style</div>
                </CrampedBox>
                <Box>
                    <Text as="p" textStyle="monospace">react-use-real-dimensions - width: {realDimensions.width && realDimensions.width.toFixed(1)}, height: {realDimensions.height && realDimensions.height.toFixed(1)}</Text>
                </Box>
                <Box mt={5} mb={4}>
                    <Text as="h3" textStyle="h3" id="installation">Installation</Text>
                </Box>
                <Box mt={4} mb={4}>
                    <Text as="p">
                        <Text textStyle="code">npm install react-use-real-dimensions --save</Text>
                        <Text as="div">or</Text>
                        <Text textStyle="code">yarn add react-use-real-dimensions</Text>
                    </Text>
                </Box>
                <Box mt={5} mb={4}>
                    <Text as="h3" textStyle="h3" id="usage">Usage</Text>
                </Box>
                <Box mb={5}>
                    <Text as="p">Use it just like <Link href="https://github.com/Swizec/useDimensions">react-use-dimensions</Link>.</Text>
                </Box>
            </TextWrapper>
        </ContentNav>
    </Page>;
};
