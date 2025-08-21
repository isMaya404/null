import { Button } from "@/lib/ui/shadcn/button";

const DetailsBtn = ({ className = "" }) => {
    return (
        <Button
            variant="default"
            className={`h-12 w-42 font-bold text-lg text-white cursor-pointer ${className}`}
        >
            Details
        </Button>
    );
};
export default DetailsBtn;
