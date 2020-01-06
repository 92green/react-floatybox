# react-floatybox 🎈🎁🎉

A React component for positioning floating components such as tooltips, dropdowns, selects etc. Avoids screen edges!

* **[See some examples - coming soon](#)**

## Features
- Handles all your bubble positioning
- Avoids screen edges
- Bubble size and position can be determined automatically, specified widths and heights not required
- Built in support for positining of tails (those little pointy things at the bottom of tooltips)
- Built in behaviour to open and close via hover or click, and to close via click-outside or ESC key
- Can use its own state or can be controlled
- Uses React portals via the [react-useportal](https://github.com/alex-cory/react-useportal) hook

## Installation

```
yarn add react-floatybox
```

## Usage

### Basic

```js
import FloatyBox from 'react-floatybox';

const Tooltip = (props) => <div>I am a tooltip</div>;

const Basic = (props) => {
    return <FloatyBox open="hover" bubble={Tooltip}>hover over me!</FloatyBox>;
};
```

### With a tail

```js
import FloatyBox from 'react-floatybox';
import Point from 'react-floatybox/Point';

const Tooltip = (props) => <div>I am a tooltip <Point {...props.tailProps} color="#000" /></div>;

const WithTail = (props) => {
    return <FloatyBox open="hover" bubble={Tooltip} tailSize={20}>hover over me!</FloatyBox>
};
```

### Alignment

```js
import FloatyBox from 'react-floatybox';

const Tooltip = (props) => <div>I am a thing</div>;

const Basic = (props) => {
    return <FloatyBox open="click" align="lt" bubble={Tooltip}>click me!</FloatyBox>;
};
```

[See more examples - coming soon](#)

## Props

### Required

#### bubble
`React.Component`

The component to render as a floaty box.

#### children
`React.Node`

The React element that the bubble is tethered to, called the "anchor".
It can handle click and hover events to control the open state of the bubble.

### Optional

#### open
`"click"|"hover" (optional)`

If provided, this sets the kind of interaction that will open and close the bubble.

#### align
`string (optional), default = "tc"`

Sets the preferred positioning of the bubble relative to the anchor. Options are:

- `tl` - top left
- `tc` - top centre
- `tr` - top right
- `bl` - bottom left
- `bc` - bottom centre
- `br` - bottom right
- `lt` - left top
- `lc` - left centre
- `lb` - left bottom
- `rt` - right top
- `rc` - right centre
- `rb` - right bottom

### gap
`number (optional), default = 10`

The gap between the bubble and the anchor, in pixels.

### edge
`number (optional), default = 10`

How close the bubble is allowed to be posiitioned near a screen edge, in pixels.

### zIndex
`number (optional), default = 100`

The `zIndex` of the bubble element.

### closeOnOutsideClick
`boolean (optional), default = true`

A [react-useportal](https://github.com/alex-cory/react-useportal) option that lets the bubble close when you click outside of it.

### closeOnEsc
`boolean (optional), default = true`

A [react-useportal](https://github.com/alex-cory/react-useportal) option that lets the bubble close when you press the escape key.

### tailSize
`number (optional)`

If a tail is used on your bubble, `tailSize` must be set so FloatyBox can adjust its positioning.

### wrap
`React.Component (optional), default = "span"`

The component that the FloatyBox anchor gets wrapped in.

### isOpen
`boolean (optional)`

If provided, FloatyBox won't keep its own state and will just be open when this boolean is `true`.

### onChange
`(isOpen: boolean) => void (optional)`

If provided along with `isOpen`, this will be called when FloatyBox wants to change state.

## Props passed to bubble

### close
`() => void`

A function that can be called from inside the bubble to close itself.

### isOpen
`boolean`

A boolean indicating if the bubble is open.

### tailProps
`{side: string, size: number, style: Object}`

An object that can be spread onto a tail component such as `react-floatybox/Point`.

### all other props

All props passed to FloatyBox are also passed down to the bubble component.

## Todo

- Support for animations by adding an option to always render bubble
- Option to auto close bubble when anchor moves off screen
- Ease into new positions, rather than snapping directly
- Add option to continually update, for when a FloatyBox is inside something that constantly moves
- Allow `closeOnOutsideClick` and `closeOnEsc` to work when controlling state externally
