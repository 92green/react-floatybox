// @flow
import type {Node} from 'react';

import React from 'react';
// $FlowFixMe
import {useState} from 'react';
// $FlowFixMe
import {useEffect} from 'react';
// $FlowFixMe
import {useLayoutEffect} from 'react';
// $FlowFixMe
import {useMemo} from 'react';
import usePortal from 'react-useportal';
import useRealDimensions from 'react-use-real-dimensions';

//
// floatybox component
//

type Props = {
    // components
    children: Node,
    wrap: any,
    // element thunks
    bubble: (bubbleParams: BubbleParams) => Node,
    // positioning
    side: "top"|"bottom"|"left"|"right",
    align: "up"|"down"|"left"|"right"|"center",
    gap: number,
    edge: number,
    zIndex: number,
    tailSize: number,
    // interaction
    open?: "click"|"hover"|"always",
    closeOnOutsideClick?: boolean,
    closeOnEsc?: boolean,
    // controlled state
    isOpen?: boolean,
    onChange?: (isOpen: boolean) => void
};

type Portal = {
    openPortal: () => void,
    closePortal: () => void,
    ref: {
        current: ?HTMLElement
    }
};

type BubbleParams = {
    close: () => any,
    isOpen: boolean,
    tailProps: any
};

const FloatyBox = (props: Props): Node => {

    let getSideAlignLetter = (str: string): string => {
        str = str[0];
        if(str === 'u') return 't';
        if(str === 'd') return 'b';
        return str;
    };

    let {gap, edge, tailSize} = props;
    let side = getSideAlignLetter(props.side);
    let align = getSideAlignLetter(props.align);


    let isControlled = typeof props.isOpen === 'boolean';

    // set up element measurement

    let [bubbleRef, dimensions] = useRealDimensions();
    let bubbleWidth = dimensions.width;
    let bubbleHeight = dimensions.height;

    // use the usePortal hook for React portal, state management,
    // using outslide clicks and esc to close etc.

    let portal = usePortal({
        // these options must be false when controlled
        // or else usePortal()s state can become out of sync
        closeOnOutsideClick: isControlled ? false : props.closeOnOutsideClick,
        closeOnEsc: isControlled ? false : props.closeOnEsc
    });

    // positioning

    let [windowWidth, windowHeight] = useWindowDimensions();

    let updateElementRectWhenChanged = [windowWidth, windowHeight, portal.isOpen, props.open === 'always'];
    let [anchorRect] = useElementRect(portal.ref, updateElementRectWhenChanged);

    let params = {
        bubbleWidth,
        bubbleHeight,
        windowWidth,
        windowHeight,
        anchorTop: anchorRect ? anchorRect.top : 0,
        anchorBottom: anchorRect ? anchorRect.bottom : 0,
        anchorLeft: anchorRect ? anchorRect.left : 0,
        anchorRight: anchorRect ? anchorRect.right : 0,
        side,
        align,
        gap,
        edge,
        tailSize
    };

    let {bubbleStyle, tailStyle, realSide} = useMemo(
        () => getFloatyStyle(params),
        Object.keys(params).map(key => params[key])
    );

    // floatybox can be controlled
    // if so, keep usePortal's state in sync

    useControlledPortal(portal, props.isOpen);

    let controlledHandlers = {
        isOpen: props.isOpen,
        openPortal: () => props.onChange && props.onChange(true),
        closePortal: () => props.onChange && props.onChange(false)
    };

    // create React elements

    let Wrap = props.wrap;
    let handlers = createHandlers(props.open, isControlled ? controlledHandlers : portal);

    let {Portal} = portal;

    let renderedBubble = useMemo(() => {
        return props.bubble({
            close: () => portal.closePortal(),
            isOpen: portal.isOpen,
            tailProps: {
                side: realSide,
                size: tailSize,
                style: tailStyle
            }
        });
    }, [
        props.bubble,
        realSide,
        tailSize,
        tailStyle,
        portal.isOpen,
        portal.closePortal
    ]);

    useEffect(() => {
        portal.portalRef.current.style.cssText = `
            z-index: ${props.zIndex.toFixed()};
            position: fixed;
            width: 200%;
            height: 200%;
            top: 0;
            left: 0;
            pointer-events: none;
        `;
    }, []);

    return <>
        <Wrap {...handlers} ref={portal.ref}>{props.children}</Wrap>
        {(portal.isOpen || props.open === 'always') &&
            <Portal>
                <div style={bubbleStyle} ref={bubbleRef}>
                    {renderedBubble}
                </div>
            </Portal>
        }
    </>;
};

FloatyBox.defaultProps = {
    side: 'top',
    align: 'center',
    gap: 10,
    edge: 10,
    wrap: 'span',
    zIndex: 100,
    tailSize: 0
};

export default FloatyBox;

//
// positioning maths
//

const lerp = (a, b, amount) => a + (b - a) * amount;
const clamp = (x, min, max) => Math.min(Math.max(x, min), max);
const inRange = (x, min, max) => x >= min && x <= max;

const X_AXIS = {l: 0, c: 0.5, r: 1};
const Y_AXIS = {t: 0, c: 0.5, b: 1};
const FLIP_AXIS = {l: 'r', r: 'l', t: 'b', b: 't'};

type GetFloatyStyleParams = {
    bubbleWidth?: number,
    bubbleHeight?: number,
    windowWidth: number,
    windowHeight: number,
    anchorTop: number,
    anchorBottom: number,
    anchorLeft: number,
    anchorRight: number,
    side: string,
    align: string,
    gap: number,
    edge: number,
    tailSize: number
};

type GetFloatyStyleResult = {
    bubbleStyle: any,
    tailStyle: any,
    realSide?: string
};

const getFloatyStyle = (params: GetFloatyStyleParams): GetFloatyStyleResult => {
    let {
        bubbleWidth,
        bubbleHeight,
        windowWidth,
        windowHeight,
        anchorTop,
        anchorBottom,
        anchorLeft,
        anchorRight,
        side,
        align,
        gap,
        edge,
        tailSize
    } = params;

    // bubble measurement not yet taken, return blank styles for measuring the bubble with
    if(bubbleHeight === undefined || bubbleWidth === undefined) {
        return {
            bubbleStyle: {},
            tailStyle: {
                display: 'none'
            }
        };
    }

    let xResult = positionOnAxis(
        side,
        align,
        gap,
        edge,
        tailSize,
        X_AXIS,
        anchorLeft,
        anchorRight,
        bubbleWidth,
        windowWidth
    );

    let yResult = positionOnAxis(
        side,
        align,
        gap,
        edge,
        tailSize,
        Y_AXIS,
        anchorTop,
        anchorBottom,
        bubbleHeight,
        windowHeight
    );

    return {
        bubbleStyle: {
            position: 'absolute',
            left: `${Math.floor(xResult.pos).toFixed()}px`,
            top: `${Math.floor(yResult.pos).toFixed()}px`,
            pointerEvents: 'auto'
        },
        tailStyle: {
            position: 'absolute',
            display: (xResult.tailHide || yResult.tailHide) ? 'none' : 'block',
            left: `${xResult.tail.toFixed()}px`,
            top: `${yResult.tail.toFixed()}px`
        },
        // $FlowFixMe - one of xResult.side or yResult.side will be a string
        realSide: xResult.side || yResult.side
    };
};

type PositionOnAxisResult = {
    pos: number,
    tail: number,
    tailHide: boolean,
    side: ?string
};

// exported only for tests
// do not use this directly,
// this is not part of the public API
// and is liable to change at any time
export const positionOnAxis = (
    side: string,
    align: string,
    gap: number,
    edge: number,
    tailSize: number,
    axis: any,
    anchorStart: number,
    anchorEnd: number,
    bubbleSize: number,
    windowSize: number
): PositionOnAxisResult => {

    let anchorSize = anchorEnd - anchorStart;
    let maxEdge = windowSize - bubbleSize - edge;

    // if this is the main axis (the first letter of props.align)
    // then do this bit
    if(axis[side] !== undefined) {
        // set position to either the close or far side of the bubble
        let startPos = anchorStart - bubbleSize - gap;
        let endPos = anchorEnd + gap;
        let pos = lerp(startPos, endPos, axis[side]);

        // flip side if there isnt enough room on preferred side
        if(pos < edge || pos + bubbleSize > windowSize - edge) {
            side = FLIP_AXIS[side];
            pos = lerp(startPos, endPos, axis[side]);
        }

        // clamp position so the bubble doesnt get too close to screen edges
        let clampedPos = clamp(pos, edge, maxEdge);

        // position tail
        let tailHide = !inRange(pos, edge, maxEdge);
        let tail = lerp(bubbleSize - 1, -tailSize + 1, axis[side]);

        return {
            pos: clampedPos,
            tail,
            tailHide,
            side
        };
    }

    // ...or else this is the cross axis (the second letter of props.align)
    let pos = lerp(anchorEnd - bubbleSize + 1, anchorStart, axis[align]);
    let tailSizeDiff = (tailSize - anchorSize) * 0.5;

    // clamp position so there is always enough room for a tail
    let clampedPos = clamp(pos, anchorEnd - bubbleSize + tailSizeDiff, anchorStart - tailSizeDiff);

    // clamp position again so the bubble doesnt get too close to screen edges
    clampedPos = clamp(clampedPos, edge, maxEdge);

    // position tail
    let tail = anchorStart - clampedPos - tailSizeDiff;
    let tailHide = !inRange(tail, 0, bubbleSize + tailSize);

    return {
        pos: clampedPos,
        tail,
        tailHide,
        side: undefined
    };
};

//
// hooks and utils
//

// floatybox can be controlled
// if so, keep usePortal's state in sync

const useControlledPortal = (portal: Portal, isOpen: ?boolean) => {
    let [lastPropsIsOpen, setLastPropsIsOpen] = useState();

    useEffect(() => {
        if(isOpen) {
            portal.openPortal();
        }
    }, []);

    if(portal.ref.current && lastPropsIsOpen !== isOpen) {
        isOpen ? portal.openPortal() : portal.closePortal();
        setLastPropsIsOpen(isOpen);
    }
};

// floatybox needs to know window dimensions as they change
// so do that, and do it whenever the size changes

const useWindowDimensions = () => {

    let [windowDimensions, setWindowDimensions] = useState([]);

    let update = () => {
        window.requestAnimationFrame(() => {
            // $FlowFixMe - this is fine, go away flow
            let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            // $FlowFixMe - this is fine, go away flow
            var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            setWindowDimensions([windowWidth, windowHeight]);
        });
    };

    useLayoutEffect(() => {
        update();
        let onResize = () => update();
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return windowDimensions;
};

// floatybox needs to keep track of elements size relative to window
// so calculate that, and recalculate it on scroll

const useElementRect = (ref, updateWhenChanged) => {
    let [rect, setRect] = useState();

    let update = () => {
        window.requestAnimationFrame(() => {
            setRect(ref.current && ref.current.getBoundingClientRect());
        });
    };

    useLayoutEffect(() => {
        let onScroll = () => update();
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    useLayoutEffect(() => {
        update();
    }, [ref.current, ...updateWhenChanged]);

    return [rect];
};

// creates event handlers to add to the anchor element
// based on the type of interaction

const createHandlers = (open, portal) => {
    let {openPortal, closePortal, isOpen} = portal;

    if(open === 'click') {
        return {
            onClick: isOpen ? closePortal : openPortal
        };
    }

    if(open === 'hover') {
        return {
            onMouseOver: openPortal,
            onMouseOut: closePortal
        };
    }

    return {};
};
