import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import { Control } from 'react-hook-form'
import { ClassNameValue } from 'tailwind-merge'

interface DatePickerProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control?: Control<any> | undefined
    name: string,
    label: string
    placeholder?: string
    className?: ClassNameValue
}

export default function DatePicker({ control, name, label, placeholder, className }: DatePickerProps) {

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={`${className} flex flex-col`}>
                    <FormLabel>{label}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={'outline'}
                                    className={cn(
                                        'w-full pl-3 text-left font-normal',
                                        !field.value && 'text-muted-foreground'
                                    )}
                                >
                                    {field.value ? (
                                        format(field.value, 'PPP')
                                    ) : (
                                        <span>{placeholder}</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                toDate={new Date()}
                                disabled={(date) =>
                                    date > new Date() || date < new Date('1900-01-01')
                                }
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
