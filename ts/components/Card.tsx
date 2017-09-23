import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<any> {

}

export const Card: React.StatelessComponent<CardProps> = (props: CardProps) => {
    return (
        <div className="pt-card pt-elevation-1" {...props}>
            { props.children }
        </div>
    );
};
