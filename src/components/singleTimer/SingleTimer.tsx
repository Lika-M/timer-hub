import { type ExtractedData as TimerProps } from "../newTimer/NewTimer";

export default function SingleTimer({name, duration}: TimerProps) {
    return (
        <article>
            <h2>{name}</h2>
            <p>{duration}</p>
        </article>
    );
}