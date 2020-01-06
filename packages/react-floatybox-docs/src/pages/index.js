// @flow
import React from 'react';
// $FlowFixMe
import {useState} from 'react';
import Page from 'component/Page';
import {H2} from 'dcme-style';
import {Box} from 'dcme-style/layout';
import {Text} from 'dcme-style/affordance';
import {Link} from 'dcme-style/affordance';
import styled from 'styled-components';

import FloatyBox from 'react-floatybox';
import Point from 'react-floatybox/Point';

import ColorPicker from '../component/ColorPicker';

const Tooltip = styled((props) => <div className={props.className}>Hello I'm a tooltip.</div>)`
    background-color: #000;
    color: #FFF;
    padding: 1rem;
`;

const TooltipWithTail = styled((props) => <div className={props.className}>Hello I'm a tooltip. <Point {...props.tailProps} color="#000" /></div>)`
    background-color: #000;
    color: #FFF;
    padding: 1rem;
`;

const ClosableTooltip = styled((props) => <div className={props.className}>Tooltip <Wow onClick={() => props.close()}>[x]</Wow>.</div>)`
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

    return <Page>
        <Box pt={[3,4]} px={[3,4]} pb="100rem" maxWidth="800px" margin="0 auto">
            <Box mb={4}>
                <Box mb={2}>
                    <H2>react-floatybox 🎈🎁🎉</H2>
                </Box>
                <Text textStyle="monospace">See also <Link to="/dimensions">react-use-real-dimensions</Link></Text>
            </Box>
            <Box mb={4}>
                <Text>A nice normal day, but then, <FloatyBox open="click" bubble={Tooltip}><Wow>click me!</Wow></FloatyBox> or <FloatyBox open="hover" bubble={Tooltip}><Wow>hover over me!</Wow></FloatyBox></Text>
            </Box>
            <Box mb={4}>
                <Text>Do you like tails? Why not <FloatyBox open="click" bubble={TooltipWithTail} tailSize={20}><Wow>add one of ours!</Wow></FloatyBox></Text>
            </Box>
            <Box mb={4}>
                <Text>Pass <Link href="https://github.com/alex-cory/react-useportal">react-useportal</Link> options as props (such as closeOnEsc = false) <FloatyBox open="click" bubble={Tooltip} closeOnEsc={false}><Wow>like this!</Wow></FloatyBox></Text>
            </Box>
            <Box mb={4}>
                <Text>Control the state yourself <FloatyBox open="click" isOpen={isOpen} onChange={setOpen} bubble={Tooltip}><Wow>like this!</Wow></FloatyBox></Text>
            </Box>
            <Box mb={4}>
                <Text>Positioning is easy, just do </Text>
                <Text>
                    <FloatyBox open="click" bubble={TooltipWithTail} tailSize={20} align="tl"><Wow>tl</Wow></FloatyBox><Text> or </Text>
                    <FloatyBox open="click" bubble={TooltipWithTail} tailSize={20} align="tc"><Wow>tc</Wow></FloatyBox><Text> or </Text>
                    <FloatyBox open="click" bubble={TooltipWithTail} tailSize={20} align="tr"><Wow>tr</Wow></FloatyBox><Text> or </Text>
                    <FloatyBox open="click" bubble={TooltipWithTail} tailSize={20} align="bl"><Wow>bl</Wow></FloatyBox><Text> or </Text>
                    <FloatyBox open="click" bubble={TooltipWithTail} tailSize={20} align="bc"><Wow>bc</Wow></FloatyBox><Text> or </Text>
                    <FloatyBox open="click" bubble={TooltipWithTail} tailSize={20} align="br"><Wow>br</Wow></FloatyBox><Text> or </Text>
                    <FloatyBox open="click" bubble={TooltipWithTail} tailSize={20} align="lt"><Wow>lt</Wow></FloatyBox><Text> or </Text>
                    <FloatyBox open="click" bubble={TooltipWithTail} tailSize={20} align="lc"><Wow>lc</Wow></FloatyBox><Text> or </Text>
                    <FloatyBox open="click" bubble={TooltipWithTail} tailSize={20} align="lb"><Wow>lb</Wow></FloatyBox><Text> or </Text>
                    <FloatyBox open="click" bubble={TooltipWithTail} tailSize={20} align="rt"><Wow>rt</Wow></FloatyBox><Text> or </Text>
                    <FloatyBox open="click" bubble={TooltipWithTail} tailSize={20} align="rc"><Wow>rc</Wow></FloatyBox><Text> or </Text>
                    <FloatyBox open="click" bubble={TooltipWithTail} tailSize={20} align="rb"><Wow>rb</Wow></FloatyBox><Text> or whatever.</Text>
                </Text>
            </Box>
            <Box mb={4}>
                <Text>Watch how they respond as you resize your browser and as you scroll. If there isn't enough room on one side, the bubble may appear on the other side. Magic!</Text>
            </Box>
            <Box mb={4}>
                <Text>How about <FloatyBox open="click" bubble={ClosableTooltip}><Wow>closable tooltips?</Wow></FloatyBox></Text>
            </Box>
            <Box mb={4}>
                <Text>What about rolling your own <ColorPicker value={color} onChange={(color) => setColor(color)} /></Text>
            </Box>
            <Box mb={4} style={{overflow: 'auto'}}>
                <Box width="170%">
                    <Text>Look at how it positions itself correctly inside of scrollable containers: <FloatyBox open="click" bubble={Tooltip}><Wow>click me!</Wow></FloatyBox></Text>
                </Box>
            </Box>
        </Box>
    </Page>;
};
