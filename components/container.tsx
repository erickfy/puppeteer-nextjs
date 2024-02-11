import { cn } from "@/lib/utils";

interface ContainerProps {
    children: React.ReactNode;
    className?: string | null | undefined
};

const Container: React.FC<ContainerProps> = ({ children, className }) => {
    return (
        <div
            className={cn("max-w-[2520px] relative mx-auto p-6 xl:px-10", className)}
        >
            {children}
        </div>
    );
}

export default Container;
