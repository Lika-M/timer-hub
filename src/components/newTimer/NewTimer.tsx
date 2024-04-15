import { useState } from "react";
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
    const initPlaceholder = { name: 'Yoga', duration: 'hh/mm/ss' }
    const [placeholder, setPlaceholder] = useState<Placeholder>(initPlaceholder);

    function handleSubmit(data: unknown) {
        const extractedData = data as ExtractedData;
        const id = Math.floor(Math.random() * 1000);
        const isValidDurationFormat = /^([01]\d|2[0-3])\/([0-5]\d)\/([0-5]\d)$/.test(extractedData.duration);
        const canAdd = extractedData.name !== '' && extractedData.duration !== '' && isValidDurationFormat;

        if (canAdd) {
            addTimer({ id: id, name: extractedData.name, duration: extractedData.duration });
        } else {

            let newName = placeholder.name;
            let newDuration = placeholder.duration;

            if (extractedData.name === '') {
                newName = 'Enter the Name';
            }
            if (!isValidDurationFormat) {
                newDuration = 'Invalid format'
            }
            if (extractedData.duration === '') {
                newDuration = 'Enter the Duration';
            }

            setPlaceholder({ name: newName, duration: newDuration });
        }
    }

    return (
        <article className={!isCollapsed ? "form" : "form collapsed"}>
            <span onClick={toggleForm}>
                {!isCollapsed
                    ? <MdKeyboardArrowRight />
                    : <MdKeyboardArrowLeft />}
            </span>
            <Form onSave={handleSubmit}>
                <Input
                    type="text"
                    id="name"
                    label="Name"
                    placeholder={placeholder.name}
                    onBlur={() => setPlaceholder(initPlaceholder)}
                />
                <Input
                    type="text"
                    id="duration"
                    label="Duration"
                    placeholder={placeholder.duration}
                    onBlur={() => setPlaceholder(initPlaceholder)}
                />
                <Button>Add New Timer</Button>
            </Form>
        </article>
    );
}