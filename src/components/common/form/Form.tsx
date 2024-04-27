import { type ComponentPropsWithoutRef, FormEvent } from "react";
import './Form.scss'

type FormProps = {
    onSave: (data: unknown) => void
} & ComponentPropsWithoutRef<'form'>;

export default function Form({ children, onSave, ...rest }: FormProps) {

     function onSubmit(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault();

        const formData = new FormData(ev.currentTarget);
        const data = Object.fromEntries(formData);

        onSave(data);
        ev.currentTarget.reset();
    }

    return (
        <form onSubmit={onSubmit} {...rest}>
            {children}
        </form>
    );
}