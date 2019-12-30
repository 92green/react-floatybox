// @flow

// stolen unashamedly from https://github.com/Swizec/useDimensions

// $FlowFixMe - this does exist on this version of react
import {useState} from 'react';
// $FlowFixMe - this does exist on this version of react
import {useCallback} from 'react';
// $FlowFixMe - this does exist on this version of react
import {useLayoutEffect} from 'react';

type DimensionObject = {
    width: number,
    height: number,
    top: number,
    left: number,
    x: number,
    y: number,
    right: number,
    bottom: number
};

function getDimensionObject(node: HTMLElement): DimensionObject {
    const rect = node.getBoundingClientRect();

    return {
        width: rect.width,
        height: rect.height,
        // $FlowFixMe - rect.x can exist
        top: "x" in rect ? rect.x : rect.top,
        // $FlowFixMe - rect.y can exist
        left: "y" in rect ? rect.y : rect.left,
        // $FlowFixMe - rect.x can exist
        x: "x" in rect ? rect.x : rect.left,
        // $FlowFixMe - rect.y can exist
        y: "y" in rect ? rect.y : rect.top,
        right: rect.right,
        bottom: rect.bottom
    };
}

type UseDimensionsArgs = {
    liveMeasure: boolean
};

type Ref = {
    current: ?HTMLElement
};

type UseDimensionsHook = [Ref, DimensionObject, HTMLElement];

function useRealDimensions({liveMeasure = true}: UseDimensionsArgs = {}): UseDimensionsHook {

    const [dimensions, setDimensions] = useState({});
    const [node, setNode] = useState(null);

    const ref = useCallback(node => {
        setNode(node);
    }, []);

    useLayoutEffect(() => {
        if(node) {
            const measure = () => {
                window.requestAnimationFrame(() => {
                    let cloned = node.cloneNode(true);
                    cloned.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                    `;

                    document.body && document.body.appendChild(cloned);
                    let dimensions = getDimensionObject(cloned);
                    document.body && document.body.removeChild(cloned);

                    setDimensions(dimensions);
                });
            };

            measure();

            if(liveMeasure) {
                window.addEventListener("resize", measure);
                return () => {
                    window.removeEventListener("resize", measure);
                };
            }
        }
    }, [node]);

    return [ref, dimensions, node];
}

export default useRealDimensions;
