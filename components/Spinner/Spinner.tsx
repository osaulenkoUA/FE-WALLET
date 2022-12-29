import React from 'react';
import {RotatingLines } from 'react-loader-spinner';

export const Spinner = () => {
    return (
        <div className={'absolute left-[40%] top-[40%] '}>
            <RotatingLines
                strokeColor="green"
                strokeWidth="5"
                animationDuration="0.75"
                width="150"
                visible={true}
            />
        </div>
    );
}
