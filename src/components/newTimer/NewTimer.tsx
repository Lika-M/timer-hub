import useTimerContext from "../../store/useTimerContext";
import Form from "../common/form/Form";
import Input from "../common/input/Input";
import Button from "../common/button/Button";

export type ExtractedData = {
    id:number;
    name: string;
    duration: number;
}

export default function NewTimer() {

    const { addTimer } = useTimerContext();

    function handleSubmit(data: unknown) {
        const extractedData = data as ExtractedData;
        const id = Math.floor(Math.random() * 1000);
        const canAdd = extractedData.name !== "" && extractedData.duration > 0;
     
        if (canAdd) {
            addTimer({id: id, name: extractedData.name, duration: Number(extractedData.duration) })
        }
    }

    return (
        <Form onSave={handleSubmit}>
            <Input
                type="text"
                id="name"
                label="Enter the Name"
                placeholder="Yoga"
            />
            <Input
                type="number"
                id="duration"
                label="Enter the Duration"
                placeholder="40"
            />
            <Button>Add New Timer</Button>
        </Form>
    );
}