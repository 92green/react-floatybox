// @flow
import React from 'react';
// $FlowFixMe
import {useState} from 'react';
// $FlowFixMe
import {useCallback} from 'react';
import Page from 'component/Page';
import {H1} from 'dcme-style';
import {Box} from 'dcme-style/layout';
import {Text} from 'dcme-style/affordance';
import {Link} from 'dcme-style/affordance';
import {ContentNav} from 'dcme-style';
import styled from 'styled-components';

import FloatyBox from 'react-floatybox';
import Point from 'react-floatybox/Point';

import ColorPicker from '../component/ColorPicker';
import IndexMdx from './indexMdx.mdx';

const Tooltip = styled.div`
    background-color: #000;
    color: #FFF;
    padding: 1rem;
`;

const Wow = styled.span`
    font-weight: 700;
    cursor: pointer;
`;

export default () => {
    // // state for "Control the state yourself" example
    // let [isOpen, setOpen] = useState(false);

    // // state for color picker example
    // let [color, setColor] = useState('#F00');

    // let tooltip = useCallback(() => {
    //     return <Tooltip>Hello I'm a tooltip.</Tooltip>;
    // }, []);

    // let tooltipWithTail = useCallback(({tailProps}) => {
    //     return <Tooltip>Hello I'm a tooltip. <Point {...tailProps} color="#000" /></Tooltip>;
    // }, []);

    // let closableTooltip = useCallback(({close}) => {
    //     return <Tooltip>Tooltip <Wow onClick={close}>[x]</Wow>.</Tooltip>;
    // }, []);

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
