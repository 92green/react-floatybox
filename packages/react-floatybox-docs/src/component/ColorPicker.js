// @flow
import type {Node} from 'react';

import React from 'react';
import FloatyBox from 'react-floatybox';
import Point from 'react-floatybox/Point';
import styled from 'styled-components';

type Props = {
    value: string,
    onChange: (color: string) => void
};

export default (props: Props): Node => {
    let color = props.value;

    // all props passed to FloatyBox are passed down to the bubble component
    // including props that FloatyBox doesn't use like onChange
    return <FloatyBox
        open="click"
        bubble={ColorPickerBubble}
        align="tc"
        tailSize={20}
        gap={25}
        color={color}
        onChange={props.onChange}
    >
        <ColorPickerInput color={color}>color picker??</ColorPickerInput>
    </FloatyBox>;
};

const ColorPickerInput = styled.span`
    font-weight: 700;
    cursor: pointer;
    padding: .5rem;
    background-color: ${props => props.color};
`;

const ColorPickerBubble = styled((props) => {
    let colors = ['#F00', '#F60', '#FF0', '#0F0', '#0FF', '#06F', '#F0F'];
    return <div className={props.className}>
        {colors.map((color, key) => <ColorPickerSquare
            key={key}
            color={color}
            selected={color === props.color}
            onClick={() => {
                props.onChange(color);
                props.close();
            }}
        />)}
        <Point {...props.tailProps} color="#EEE" />
    </div>;
})`
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
