'use client'
import React from 'react';
import {LazyImageRenderer} from 'lazy-image-renderer'
import {LazyImageRendererProps} from "lazy-image-renderer/dist/LazyImageRenderer/LazyImageRenderer";


function LazyImage(props : LazyImageRendererProps & React.RefAttributes<HTMLImageElement>) {
    return (
        <LazyImageRenderer {...props}/>
    );
}

export default React.memo(LazyImage);