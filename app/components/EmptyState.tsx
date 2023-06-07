'use client';
import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}


const EmptyState = ({title="No exact matches", subtitle="Try changing or removing some of your filters", showReset}: EmptyStateProps) => {

    const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
        <Heading  
            title={title}
            subtitle={subtitle}
            center
        />
        <div className="w-48 mt-4">
            {showReset && (
                <Button  
                    outline
                    onClick={() => router.push('/')}
                    label="Reset filters"
                />
            )}
        </div>
    </div>
  )
}

export default EmptyState;