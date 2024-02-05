import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Todo } from '@/hooks/useTodoList'

interface DialogProps {
    open: boolean
    onOpenChange: () => void
    deleteFunction: (id: string) => void
    todo: Todo | null
}

export function DeleteTodoDialog({ open, onOpenChange, deleteFunction, todo }: DialogProps) {

    // if (!todo) {
    //     onOpenChange()
    //     return <></>
    // }

    const handleDeleteTodo = () => {
        if (!todo) return
        deleteFunction(todo.id)
        onOpenChange()
    }

    return (
        <>
            {todo && (
                <Dialog open={open} onOpenChange={onOpenChange}>
                    <DialogContent className="w-[90%] sm:max-w-[425px] rounded-xl border-2">
                        <DialogHeader>
                            <DialogTitle className='text-left'>Excluir</DialogTitle>
                            <DialogDescription className='text-left'>Tem certeza que deseja excluir o To-Do?</DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-2 py-4">
                            <p className='text-left text-lg font-semibold'>{todo!.title}</p>
                            <p className='text-left text-sm'>{todo!.description}</p>
                        </div>
                        <DialogFooter className='flex flex-col gap-2'>
                            <Button
                                variant='destructive'
                                onClick={() => handleDeleteTodo()}
                            >Excluir</Button>
                            <Button
                                variant='outline'
                                className='border-primary'
                                onClick={onOpenChange}
                            >Cancelar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}
