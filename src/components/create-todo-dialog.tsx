import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TodoCreate } from '@/hooks/useTodoList'
import { useState } from 'react'
import { Textarea } from './ui/textarea'
import { useToast } from './ui/use-toast'

interface CreateTodoDialogProps {
    open: boolean
    onOpenChange: () => void
    createFunction: (todo: TodoCreate) => void
}

export function CreateTodoDialog({ open, onOpenChange, createFunction }: CreateTodoDialogProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const maxTitleLength = 20
    const maxDescriptionLength = 200

    const { toast } = useToast()

    const handleTitleChange = (text: string) => {
        setTitle(text)
    }

    const handleDescriptionChange = (text: string) => {
        setDescription(text)
    }

    const handleCreateTodo = () => {
        if (title.length < 3) {
            toast({
                title: 'Título muito curto',
                variant: 'destructive'
            })
            return
        }

        if (title.length > maxTitleLength) {
            toast({
                title: 'Título muito longo',
                variant: 'destructive'
            })
            return
        }

        if (description.length > maxDescriptionLength) {
            toast({
                title: 'Descrição muito longa',
                variant: 'destructive'
            })
            return
        }
        setTitle('')
        setDescription('')
        onOpenChange()
        createFunction({ title, description, completed: false })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[90%] sm:max-w-[425px] rounded-xl border-2">
                <DialogHeader>
                    <DialogTitle className='text-left'>Crie um novo To-Do</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2 py-4">
                    <div className="flex flex-col items-start gap-2">
                        <Label htmlFor="title" className="text-right">
                            Título
                        </Label>
                        <Input
                            id="title"
                            className="w-full"
                            placeholder='Ex: Comprar pão'
                            value={title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                        />
                        <p className={`w-full text-right text-xs italic ${title.length < maxTitleLength ? 'text-muted-foreground' : 'text-destructive'}`}>{`${title.length}/${maxTitleLength}`}</p>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <Label htmlFor="description" className="text-right">
                            Descrição
                        </Label>
                        <Textarea
                            id="description"
                            className="w-full"
                            placeholder='Ex: Comprar pão na padaria da esquina'
                            value={description}
                            onChange={(e) => handleDescriptionChange(e.target.value)}
                        />
                        <p className={`w-full text-right text-xs italic ${description.length < maxDescriptionLength ? 'text-muted-foreground' : 'text-destructive'}`}>{`${description.length}/${maxDescriptionLength}`}</p>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleCreateTodo}>Criar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
