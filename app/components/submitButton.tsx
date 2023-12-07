import { useFormStatus } from "react-dom";
import { Button } from "./button"

const SubmitButton = () => {
    const status = useFormStatus();
    console.log('status: ', status)

    return <Button aria-disabled={status.pending} type='submit'>Submit</Button>
}

export default SubmitButton;