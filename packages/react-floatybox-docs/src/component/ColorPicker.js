// @flow
import type {Node} from 'react';

import React from 'react';
// $FlowFixMe
import {useCallback} from 'react';
import FloatyBox from 'react-floatybox';
import Point from 'react-floatybox/Point';
import styled from 'styled-components';

type Props = {
    value: string,
    onChange: (color: string) => void
};

let colors = ['#F00', '#F60', '#FF0', '#0F0', '#0FF', '#06F', '#F0F'];

export default (props: Props): Node => {
    let currentColor = props.value;

    let bubble = useCallback(({tailProps, close}) => {
        return <ColorPickerBubble>
            {colors.map((color, key) => <ColorPickerSquare
                key={key}
                color={color}
                selected={color === currentColor}
                onClick={() => {
                    props.onChange(color);
                    close();
                }}
            />)}
            <Point {...tailProps} color="#EEE" />
        </ColorPickerBubble>;
    }, [currentColor, props.onChange]);

    // all props passed to FloatyBox are passed down to the bubble component
    // including props that FloatyBox doesn't use like onChange
    return <FloatyBox
        open="click"
        bubble={bubble}
        align="tc"
        tailSize={20}
        gap={25}
    >
        <ColorPickerInput color={currentColor}>color picker??</ColorPickerInput>
    </FloatyBox>;
};

const ColorPickerInput = styled.span`
    font-weight: 700;
    cursor: pointer;
    padding: .5rem;
    background-color: ${props => props.color};
`;

const ColorPickerBubble = styled.div`
    background-color: #EEE;
    padding: .5rem;
`;

const ColorPickerSquare = styled.div`
    background-color: ${props => props.color};
    width: 1.5rem;
    height: 1.5rem;
    display: inline-block;
    cursor: pointer;
    border: 2px solid ${props => props.selected ? '#333' : '#EEE'};

    &:hover {
        opacity: .8;
    }
`;
