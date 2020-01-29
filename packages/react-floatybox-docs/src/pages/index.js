// @flow
import React from 'react';
// $FlowFixMe
import {useState} from 'react';
// $FlowFixMe
import {useCallback} from 'react';
import Page from 'component/Page';
import {H2} from 'dcme-style';
import {Box} from 'dcme-style/layout';
import {Text} from 'dcme-style/affordance';
import {Link} from 'dcme-style/affordance';
import styled from 'styled-components';

import FloatyBox from 'react-floatybox';
import Point from 'react-floatybox/Point';

import ColorPicker from '../component/ColorPicker';

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
    // state for "Control the state yourself" example
    let [isOpen, setOpen] = useState(false);

    // state for color picker example
    let [color, setColor] = useState('#F00');

    let tooltip = useCallback(() => {
        return <Tooltip>Hello I'm a tooltip.</Tooltip>;
    }, []);

    let tooltipWithTail = useCallback(({tailProps}) => {
        return <Tooltip>Hello I'm a tooltip. <Point {...tailProps} color="#000" /></Tooltip>;
    }, []);

    let closableTooltip = useCallback(({close}) => {
        return <Tooltip>Tooltip <Wow onClick={close}>[x]</Wow>.</Tooltip>;
    }, []);

    return <Page>
        <Box pt={[3,4]} px={[3,4]} pb="100rem" maxWidth="800px" margin="0 auto">
            <Box mb={4}>
                <Box mb={2}>
                    <H2>react-floatybox 🎈🎁🎉</H2>
                </Box>
                <Text textStyle="monospace">See also <Link to="/dimensions">react-use-real-dimensions</Link></Text>
            </Box>
            <Box mb={4}>
                <Text>A nice normal day, but then, <FloatyBox open="click" bubble={tooltip}><Wow>click me!</Wow></FloatyBox> or <FloatyBox open="hover" bubble={tooltip}><Wow>hover over me!</Wow></FloatyBox></Text>
            </Box>
            <Box mb={4}>
                <Text>Do you like tails? Why not <FloatyBox open="click" bubble={tooltipWithTail} tailSize={20}><Wow>add one of ours!</Wow></FloatyBox></Text>
            </Box>
            <Box mb={4}>
                <Text>Pass <Link href="https://github.com/alex-cory/react-useportal">react-useportal</Link> options as props (such as closeOnEsc = false) <FloatyBox open="click" bubble={tooltip} closeOnEsc={false}><Wow>like this!</Wow></FloatyBox></Text>
            </Box>
            <Box mb={4}>
                <Text>Control the state yourself <FloatyBox open="click" isOpen={isOpen} onChange={setOpen} bubble={tooltip}><Wow>like this!</Wow></FloatyBox></Text>
            </Box>
            <Box mb={4}>
                <Text>Positioning is easy, just use the <Wow>side</Wow> and <Wow>align</Wow> props.</Text>
            </Box>
            <Box mb={4}>
                <Text>
                    <FloatyBox open="click" bubble={tooltipWithTail} tailSize={20} side="top"><Wow>top</Wow></FloatyBox><Text> or </Text>
                    <FloatyBox open="click" bubble={tooltipWithTail} tailSize={20} side="top" align="left"><Wow>top / left</Wow></FloatyBox><Text> or </Text>
                    <FloatyBox open="click" bubble={tooltipWithTail} tailSize={20} side="top" align="right"><Wow>top / right</Wow></FloatyBox><Text> or </Text>
                    <FloatyBox open="click" bubble={tooltipWithTail} tailSize={20} side="bottom"><Wow>bottom</Wow></FloatyBox><Text> or </Text>
                    <FloatyBox open="click" bubble={tooltipWithTail} tailSize={20} side="bottom" align="left"><Wow>bottom / left</Wow></FloatyBox><Text> or </Text>
                    <FloatyBox open="click" bubble={tooltipWithTail} tailSize={20} side="bottom" align="right"><Wow>bottom / right</Wow></FloatyBox><Text> or </Text>
                    <FloatyBox open="click" bubble={tooltipWithTail} tailSize={20} side="left"><Wow>left</Wow></FloatyBox><Text> or </Text>
                    <FloatyBox open="click" bubble={tooltipWithTail} tailSize={20} side="left" align="up"><Wow>left / up</Wow></FloatyBox><Text> or </Text>
                    <FloatyBox open="click" bubble={tooltipWithTail} tailSize={20} side="left" align="down"><Wow>left / down</Wow></FloatyBox><Text> or </Text>
                    <FloatyBox open="click" bubble={tooltipWithTail} tailSize={20} side="right"><Wow>right</Wow></FloatyBox><Text> or </Text>
                    <FloatyBox open="click" bubble={tooltipWithTail} tailSize={20} side="right" align="up"><Wow>right / up</Wow></FloatyBox><Text> or </Text>
                    <FloatyBox open="click" bubble={tooltipWithTail} tailSize={20} side="right" align="down"><Wow>right / down</Wow></FloatyBox><Text> or whatever.</Text>
                </Text>
            </Box>
            <Box mb={4}>
                <Text>Watch how they respond as you resize your browser and as you scroll. If there isn't enough room on one side, the bubble may appear on the other side. Magic!</Text>
            </Box>
            <Box mb={4}>
                <Text>How about <FloatyBox open="click" bubble={closableTooltip}><Wow>closable tooltips?</Wow></FloatyBox></Text>
            </Box>
            <Box mb={4}>
                <Text>What about rolling your own <ColorPicker value={color} onChange={(color) => setColor(color)} /></Text>
            </Box>
            <Box mb={4} style={{overflow: 'auto'}}>
                <Box width="170%">
                    <Text>Look at how it positions itself correctly inside of scrollable containers: <FloatyBox open="click" bubble={tooltip}><Wow>click me!</Wow></FloatyBox></Text>
                </Box>
            </Box>
        </Box>
    </Page>;
};
