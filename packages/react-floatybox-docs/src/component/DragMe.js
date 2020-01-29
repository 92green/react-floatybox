// @flow
import type {Node} from 'react';

import React from 'react';
// $FlowFixMe
import {useCallback} from 'react';
// $FlowFixMe
import {useState} from 'react';
// $FlowFixMe
import {useRef} from 'react';

import FloatyBox from 'react-floatybox';
import Point from 'react-floatybox/Point';

import styled from 'styled-components';
import {Flex} from 'dcme-style/layout';
import {Box} from 'dcme-style/layout';
import {H4} from 'dcme-style';
import {Checkbox} from 'dcme-style/affordance';
import {Input} from 'dcme-style/affordance';
import {Select} from 'dcme-style/affordance';
import {Text} from 'dcme-style/affordance';

import useParcelState from 'react-dataparcels/useParcelState';
import ParcelBoundary from 'react-dataparcels/ParcelBoundary';

const INITIAL_PROPS = {
    props: {
        open: 'always',
        tailSize: 20,
        side: 'top',
        align: 'center',
        gap: 10,
        edge: 10,
        wrap: 'div'
    },
    demo: {
        big: false
    }
};

const getAlignOptions = (side) => {
    let vertical = side === 'top' || side === 'bottom';
    return vertical ? ['center','left','right'] : ['center','up','down'];
};

const Tooltip = styled.div`
    background-color: #000;
    color: #FFF;
    padding: 1rem;
`;

const InputRow = ({children, label}: any): Node => {
    return <Flex as="label" my={2} alignItems="center">
        <Box mr="auto">
            <Text textStyle="label">{label}</Text>
        </Box>
        <Box width="6rem">{children}</Box>
    </Flex>;
};

export const DragMe = styled((props: any) => {

    let [demoParcel] = useParcelState({
        value: () => INITIAL_PROPS,
        beforeChange: (value) => {
            if(!getAlignOptions(value.props.side).includes(value.props.align)) {
                value.props.align = 'center';
            }
            return value;
        }
    });

    let bubble = useCallback(({tailProps}) => {
        return <Tooltip>I am a tooltip <Point {...tailProps} color="#000" /></Tooltip>;
    }, []);

    let floatyBoxProps = {
        ...demoParcel.value.props,
        tailSize: Number(demoParcel.value.props.tailSize),
        bubble
    };

    let alignOptions = getAlignOptions(demoParcel.getIn(['props','side']).value);

    return <div className={props.className}>
        <Flex display={['block', 'flex']}>
            <Box width="33%" mr={[null, 3]} mb={[3, null]} p={[4,5]}>
                <DragBox big={demoParcel.value.demo.big} floatyBoxProps={floatyBoxProps} />
            </Box>
            <Box width="33%" mr={[null, 3]} mb={[3, null]}>
                <H4>Props</H4>
                <ParcelBoundary parcel={demoParcel.getIn(['props','open'])}>
                    {(parcel) => <InputRow label="open"><Select {...parcel.spreadDOM()} options={['always','click','hover']} /></InputRow>}
                </ParcelBoundary>
                <ParcelBoundary parcel={demoParcel.getIn(['props','side'])}>
                    {(parcel) => <InputRow label="side"><Select {...parcel.spreadDOM()} options={['top','bottom','left','right']} /></InputRow>}
                </ParcelBoundary>
                <ParcelBoundary parcel={demoParcel.getIn(['props','align'])} forceUpdate={[alignOptions]}>
                    {(parcel) => <InputRow label="align"><Select {...parcel.spreadDOM()} options={alignOptions} /></InputRow>}
                </ParcelBoundary>
                <ParcelBoundary parcel={demoParcel.getIn(['props','gap'])}>
                    {(parcel) => <InputRow label="gap"><Input type="number" width="100%" {...parcel.spreadDOM()} /></InputRow>}
                </ParcelBoundary>
                <ParcelBoundary parcel={demoParcel.getIn(['props','edge'])}>
                    {(parcel) => <InputRow label="edge"><Input type="number" width="100%" {...parcel.spreadDOM()} /></InputRow>}
                </ParcelBoundary>
                <ParcelBoundary parcel={demoParcel.getIn(['props','tailSize'])}>
                    {(parcel) => <InputRow label="tailSize"><Input type="number" width="100%" {...parcel.spreadDOM()} /></InputRow>}
                </ParcelBoundary>
            </Box>
            <Box width="33%">
                <H4>Demo options</H4>
                <ParcelBoundary parcel={demoParcel.getIn(['demo','big'])}>
                    {(parcel) => <InputRow label="big"><Checkbox {...parcel.spreadDOMCheckbox()} /></InputRow>}
                </ParcelBoundary>
            </Box>
        </Flex>
    </div>;
})`
    border: 1px dashed ${props => props.theme.colors.line};
    width: 100%;
    height: 20rem;
    padding: 1rem;
`;

const DragBox = (props: any): Node => {

    let [position, setPosition] = useState(null);
    let dragStart = useRef();

    let mouseMove = useCallback((e) => {
        if(!dragStart.current) {
            return;
        }
        let drag = dragStart.current;


        setPosition({
            top: drag.top + (e.clientY - drag.clientY),
            left: drag.left + (e.clientX - drag.clientX)
        });
    }, []);

    let ref = useCallback(node => {
        if(!node) {
            return;
        }

        setPosition({
            top: node.offsetTop,
            left: node.offsetLeft
        });

        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', mouseMove);
        });
    }, []);

    let onMouseDown = useCallback((e) => {
        dragStart.current = {
            clientX: e.clientX,
            clientY: e.clientY,
            left: position.left,
            top: position.top
        };
        document.addEventListener('mousemove', mouseMove);
    }, [position]);

    let style = position
        ? {
            position: 'absolute',
            top: position.top,
            left: position.left
        }
        : {};

    return <div ref={ref} style={style} onMouseDown={onMouseDown}>
        <FloatyBox {...props.floatyBoxProps}>
            <InnerBox big={props.big}></InnerBox>
        </FloatyBox>
    </div>;
};

const InnerBox = styled.div`
    width: ${props => props.big ? '12rem' : '3rem'};
    height: ${props => props.big ? '12rem' : '3rem'};
    background: ${props => props.theme.colors.primary};
    border-radius: 5px;
    text-align: center;
    cursor: move;
    cursor: grab;
    font-size: .8rem;
    line-height: 1.2rem;
    font-family: ${props => props.theme.fonts.monospace};
    user-select: none;

    &:active {
        cursor: grabbing;
    }
`;
