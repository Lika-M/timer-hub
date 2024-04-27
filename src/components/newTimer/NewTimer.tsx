import { useState, ChangeEvent, FocusEvent } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

import useTimerContext from "../../store/useTimerContext";
import Form from "../common/form/Form";
import Input from "../common/input/Input";
import Button from "../common/button/Button";
import './newTimer.scss';

type Placeholder = {
    name: string,
    duration: string;
}

export type ExtractedData = Placeholder & {
    id: number;
}

type NewTimerProps = {
    toggleForm: () => void,
    isCollapsed: boolean
}

export default function NewTimer({ toggleForm, isCollapsed }: NewTimerProps) {

    const { addTimer } = useTimerContext();
    const initPlaceholder = { name: 'Yoga', duration: 'hh/mm/ss' };
    const [enteredInput, setEnteredInput] = useState<Placeholder>({ name: '', duration: '' });
    const [placeholder, setPlaceholder] = useState<Placeholder>(initPlaceholder);
    const [error, setError] = useState(false);

    function handleChange(ev: ChangeEvent<HTMLInputElement>) {
        const { name, value } = ev.target;
        let newValue = value;

        if (name === "duration" && value.length > enteredInput.duration.length) {
            if (value.length === 2 || value.length === 5) {
                newValue = value + '/';
            }
        }

        setEnteredInput(state => ({
            ...state,
            [name]: newValue
        }));
    }

    function handleFocus(ev: FocusEvent<HTMLInputElement>) {
        const { name } = ev.target;
        setEnteredInput(state => ({
            ...state,
            [name]: ''
        }));
        setError(false);
        setPlaceholder(initPlaceholder);
    }

    function handleSubmit(data: unknown) {
        const extractedData = data as ExtractedData;
        const id = Math.floor(Math.random() * 1000);
        const isValidDurationFormat = /^([01]\d|2[0-3])\/([0-5]\d)\/([0-5]\d)$/.test(extractedData.duration);
        const canAdd = extractedData.name !== '' && extractedData.duration !== '' && isValidDurationFormat;

        if (canAdd) {
            addTimer({ id: id, name: extractedData.name, duration: extractedData.duration });
            setEnteredInput({ name: '', duration: '' });
            setError(false);
        } else {
            setError(true);
            let newName = placeholder.name;
            let newDuration = placeholder.duration;

            if (extractedData.name === '') {
                newName = 'Enter the Name';
                setEnteredInput({ name: '', duration: enteredInput.duration });
            }
            if (!isValidDurationFormat) {
                newDuration = 'Invalid format';
                setEnteredInput({ name: enteredInput.name, duration: '' });
            }
            if (extractedData.duration === '') {
                newDuration = 'Enter the Duration';
                setEnteredInput({ name: enteredInput.name, duration: '' });
            }

            setPlaceholder({ name: newName, duration: newDuration });
        }
    }

    return (
        <>
            <article className={isCollapsed ? "form collapsed" : "form expanded"}>
                <span onClick={toggleForm}>
                    {isCollapsed
                        ? <MdKeyboardArrowRight />
                        : <MdKeyboardArrowLeft />}
                </span>
                <Form onSave={handleSubmit} className={!error ? "add-form" : "add-form error"}>
                    <img src="/assets/multi-timer.png" alt="Multi-timer" />
                    <Input
                        type="text"
                        id="name"
                        label="Timer Name"
                        placeholder={placeholder.name}
                        onBlur={() => setPlaceholder(initPlaceholder)}
                        onFocus={handleFocus}
                        onChange={handleChange}
                        value={enteredInput.name}
                    />
                    <Input
                        type="text"
                        id="duration"
                        label="Timer Duration"
                        placeholder={placeholder.duration}
                        onBlur={() => setPlaceholder(initPlaceholder)}
                        onFocus={handleFocus}
                        onChange={handleChange}
                        value={enteredInput.duration}
                    />
                    <Button>Add New Timer</Button>
                </Form>
            </article>
        </>
    );
}