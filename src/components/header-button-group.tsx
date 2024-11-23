import { buttonVariants } from "@/components/ui/button";
import { IconButton } from "@/components/xui/icon-button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { KeyedMutator } from "swr";
import { toast } from "sonner"

interface ButtonGroupProps<E, U> {
    className?: string;
    children?: React.ReactNode;
    delete: { fn: (id: E[]) => Promise<void>, id: E[], mutate: KeyedMutator<U> };
}

export function HeaderButtonGroup<E, U>({ className, children, delete: { fn, id, mutate } }: ButtonGroupProps<E, U>) {
    const handleDelete = async () => {
        await fn(id);
        await mutate();
    }

    return (
        <div className={className}>
            {id.length < 1 ? (
                <>
                    <IconButton variant="destructive" icon="trash" onClick={() => {
                        toast("Error", {
                            description: "No rows are selected."
                        });
                    }} />
                    {children}
                </>
            ) : (
                <>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <IconButton variant="destructive" icon="trash" />
                        </AlertDialogTrigger>
                        <AlertDialogContent className="sm:max-w-lg">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Confirm Deletion?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This operation is unrecoverable!
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className={buttonVariants({ variant: "destructive" })} onClick={handleDelete}>Confirm</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    {children}
                </>
            )}
        </div>
    )
}
