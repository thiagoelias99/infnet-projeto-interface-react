import { Check, ChevronsUpDown } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { useMediaQuery } from '@uidotdev/usehooks'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { ClassNameValue } from 'tailwind-merge'
import { useState } from 'react'
import { ScrollArea } from './scroll-area'

interface ComboboxFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fieldName: string,
    label: string
    placeholder?: string
    className?: ClassNameValue
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>
    options: { label: string, value: string }[]
}

export function ComboboxForm({ label, fieldName, className, form, options }: ComboboxFormProps) {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery('(min-width: 768px)')

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem className={`w-full flex flex-col mt-2 ${className}`}>
                    <FormLabel className='mb-0.5'>{label}</FormLabel>
                    {isDesktop && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            'w-full justify-between',
                                            !field.value && 'text-muted-foreground'
                                        )}
                                    >
                                        {field.value
                                            ? options.find(
                                                (option) => option.value === field.value
                                            )?.label
                                            : 'Selecione'}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder="Buscar estado" />
                                    <CommandEmpty>Não encontrado</CommandEmpty>
                                    <CommandGroup>
                                        <ScrollArea className="h-[360px] w-full pb-4">
                                            {options.map((option) => (
                                                <CommandItem
                                                    value={option.label}
                                                    key={option.value}
                                                    onSelect={() => {
                                                        form.setValue(fieldName, option.value)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            'mr-2 h-4 w-4',
                                                            option.value === field.value
                                                                ? 'opacity-100'
                                                                : 'opacity-0'
                                                        )}
                                                    />
                                                    {option.label}
                                                </CommandItem>
                                            ))}
                                        </ScrollArea>
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    )}
                    {!isDesktop && (
                        <Drawer open={open} onOpenChange={setOpen}>
                            <DrawerTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            'w-full px-1.5 flex flex-row items-center justify-between',
                                            !field.value && 'text-muted-foreground'
                                        )}
                                    >
                                        <p className='flex-1 overflow-hidden text-left text-ellipsis'>
                                            {field.value
                                                ? options.find(
                                                    (option) => option.value === field.value
                                                )?.label
                                                : 'Selecione'}
                                        </p>
                                        <ChevronsUpDown className="ml-0.5 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </FormControl>
                            </DrawerTrigger>
                            <DrawerContent className='h-[560px]'>
                                <Command>
                                    <CommandInput placeholder="Buscar estado" />
                                    <CommandEmpty>Não encontrado</CommandEmpty>
                                    <CommandGroup>
                                        <ScrollArea className="h-[560px] w-full pb-4">
                                            {options.map((option) => (
                                                <CommandItem
                                                    value={option.label}
                                                    key={option.value}
                                                    onSelect={() => {
                                                        form.setValue(fieldName, option.value)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            'mr-2 h-4 w-4',
                                                            option.value === field.value
                                                                ? 'opacity-100'
                                                                : 'opacity-0'
                                                        )}
                                                    />
                                                    {option.label}
                                                </CommandItem>
                                            ))}
                                        </ScrollArea>
                                    </CommandGroup>
                                </Command>
                            </DrawerContent>
                        </Drawer>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
