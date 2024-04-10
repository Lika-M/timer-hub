import { useState } from "react";
import useTimerContext from "../../store/useTimerContext";
import Form from "../common/form/Form";
import Input from "../common/input/Input";
import Button from "../common/button/Button";

type Placeholder = {
    name: string,
    duration: string;
}

export type ExtractedData = Placeholder & {
    id: number;
}

export default function NewTimer() {

    const { addTimer } = useTimerContext();
    const initPlaceholder ={ name: 'Yoga', duration: 'hh/mm/ss' }
    const [placeholder, setPlaceholder] = useState<Placeholder>(initPlaceholder);
    
    function handleSubmit(data: unknown) {
        const extractedData = data as ExtractedData;
        const id = Math.floor(Math.random() * 1000);
        const isValidDurationFormat = /^([01]\d|2[0-3])\/([0-5]\d)\/([0-5]\d)$/.test(extractedData.duration);
        const canAdd = extractedData.name !== '' && extractedData.duration !== ''&&  isValidDurationFormat;

        if (canAdd) {
            addTimer({ id: id, name: extractedData.name, duration: extractedData.duration });
        } else {

            let newName = placeholder.name;
            let newDuration = placeholder.duration;

            if (extractedData.name === '') {
                newName = 'All fields are required!';
            }
            if ( !isValidDurationFormat){
                newDuration = 'Invalid format.'
            }
            if (extractedData.duration === '') {
                newDuration = 'All fields are required!';
            }

            setPlaceholder({ name: newName, duration: newDuration });
        }
    }

    return (
        <Form onSave={handleSubmit}>
            <Input
                type="text"
                id="name"
                label="Enter the Name"
                placeholder={placeholder.name}
                onBlur={() => setPlaceholder(initPlaceholder)}
            />
            <Input
                type="text"
                id="duration"
                label="Enter the Duration"
                placeholder={placeholder.duration}
                onBlur={() => setPlaceholder(initPlaceholder)}
            />
            <Button>Add New Timer</Button>
        </Form>
    );
}