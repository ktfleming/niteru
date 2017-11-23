import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<any> {

}

export const Card: React.StatelessComponent<CardProps> = (props: CardProps) => {
    return (
        <div className="card" {...props}>
            { props.children }
        </div>
    );
};
