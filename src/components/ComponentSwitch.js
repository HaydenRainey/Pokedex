import React, { useState } from 'react';

export default function ComponentSwitch({children, selected}){

    const renderChildren = () =>{
        return React.Children.map(children, (child,index) => {
          if(selected == index)
            return child;
        })
    }

    return (
        <>
            {renderChildren()}
        </>
    );

}
