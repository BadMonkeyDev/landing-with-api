declare module '*.svg' {
    import React from 'react';

    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

    const src: string;
    export default src;
}

declare module '*.module.scss' {
    const content: { [className: string]: string };
    export default content;
}