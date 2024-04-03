import { type ComponentPropsWithoutRef } from "react";
import './Input.scss';

type InputProps = {
    id: string;
    label: string;
} & ComponentPropsWithoutRef<'input'>;

export default function Input({ id, label, ...restProps }: InputProps) {

    return (
        <div className="add-form__input">
            <label htmlFor={id}>{label}</label>
            <input id={id} name={id} {...restProps} />
        </div>
    );
}