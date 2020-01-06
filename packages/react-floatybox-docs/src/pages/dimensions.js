// @flow
import React from 'react';
import Page from 'component/Page';
import {H2} from 'dcme-style';
import {Box} from 'dcme-style/layout';
import {Text} from 'dcme-style/affordance';
import {Link} from 'dcme-style/affordance';
import styled from 'styled-components';

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
        <Box p={[3,4]} maxWidth="800px" margin="0 auto">
            <Box mb={5}>
                <Box mb={2}>
                    <H2>react-use-real-dimensions 🕊️↔😌</H2>
                </Box>
                <Text textStyle="monospace">See also <Link to="/">react-floatybox</Link></Text>
            </Box>
            <Box>
                <Box mb={3}>
                    <Text as="p">So <Link href="https://github.com/Swizec/useDimensions">react-use-dimensions</Link> will measure your rendered elements in place.</Text>
                </Box>
                <Box mb={3}>
                    <Text as="p">But <Text textStyle="strong">react-use-real-dimensions</Text> will measure your elements in isolation, unconstrained by the rest of the page layout.</Text>
                </Box>
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
            <Box mt={4} mb={4}>
                <Text as="h3" textStyle="h3">Usage</Text>
            </Box>
            <Box mb={5}>
                <Text as="p">Use it just like <Link href="https://github.com/Swizec/useDimensions">react-use-dimensions</Link>.</Text>
            </Box>
        </Box>
    </Page>;
};
