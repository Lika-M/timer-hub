import { useState } from "react";
import useTimerContext from "../../store/useTimerContext";
import Form from "../common/form/Form";
import Input from "../common/input/Input";
import Button from "../common/button/Button";

export type ExtractedData = {
    id: number;
    name: string;
    duration: string;
}

export default function NewTimer() {

    const { addTimer } = useTimerContext();
    const [placeholder, setPlaceholder] = useState<string>('Yoga');

    function handleSubmit(data: unknown) {
        const extractedData = data as ExtractedData;
        const id = Math.floor(Math.random() * 1000);
        const canAdd = extractedData.name !== "" && extractedData.duration !== "";
        
        if (canAdd) {
            addTimer({ id: id, name: extractedData.name, duration: extractedData.duration });
        } else {
            setPlaceholder('All fields are required!');
        }
    }

    return (
        <Form onSave={handleSubmit}>
            <Input
                type="text"
                id="name"
                label="Enter the Name"
                placeholder={placeholder}
                onFocus={() => setPlaceholder('')}
                onBlur={() => setPlaceholder('Yoga')}
            />
            <Input
                type="time"
                min="00:00" max="12:00" step="300"
                id="duration"
                label="Enter the Duration"
            />
            <Button>Add New Timer</Button>
        </Form>
    );
}