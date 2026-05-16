import { Button } from '@/components/ui/button'
import { useFormContext } from '@/src/hooks/formHook'
import type { ComponentProps } from 'react'

interface FormButtonProps extends ComponentProps<typeof Button> {
    label: string
}

export function FormButton({ label, ...props }: FormButtonProps) {
    const form = useFormContext()

    return (
        <form.Subscribe selector={(state) => state.isSubmitting}>
            <Button variant='default' {...props}>
                {label}
            </Button>
        </form.Subscribe>
    )
}
