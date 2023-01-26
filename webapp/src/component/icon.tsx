import React from 'react';

interface IconProps {
    icon: string
    url: string
    title: string
    width: string
    heght: string
}


export const Icon: React.FC<IconProps> = (props: IconProps) => <img src={props.icon} height={props.heght} width={props.width} />;