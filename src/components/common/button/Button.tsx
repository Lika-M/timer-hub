import { ComponentPropsWithoutRef, type ReactNode } from 'react';
import './Button.scss';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    children: ReactNode;
}

export default function Button(props: ButtonProps) {
    return (
        <button className="button" {...props}>
          {props.children}
        </button>
    );
}