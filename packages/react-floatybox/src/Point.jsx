// @flow
import type {Node} from 'react';
import React from 'react';

type Props = {
    color: string,
    side: "t"|"b"|"l"|"r",
    size: number,
    style: {[property: string]: any}
};

let sides = {
    t: 'Top',
    b: 'Bottom',
    l: 'Left',
    r: 'Right'
};

export default (props: Props): Node => {

    let style = {
        ...props.style,
        width: 0,
        height: 0,
        borderWidth: `${(props.size * 0.5).toFixed()}px`,
        borderStyle: `solid`
    };

    for(let side in sides) {
        let color = props.side === side ? props.color : `transparent`;
        style[`border${sides[side]}Color`] = color;
    }

    return <div style={style} />;
};
