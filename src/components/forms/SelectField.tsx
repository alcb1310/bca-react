import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { useFieldContext } from '@/hooks/formHook'
import { useStore } from '@tanstack/react-form'
import type { ComponentProps } from 'react'

type Option = {
    value: string
    label: string
}

interface SelectFieldProps extends ComponentProps<typeof NativeSelect> {
    name: string
    label: string
    description?: string
    options: Option[]
}

export function SelectField({
    name,
    label,
    description,
    options,
    ...props
}: Readonly<SelectFieldProps>) {
    const field = useFieldContext<string>()
    const errors = useStore(field.store, (state) => state.meta.errors)

    return (
        <Field className='mt-2'>
            <FieldLabel htmlFor={label}>{label}</FieldLabel>
            <NativeSelect
                name={name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                size='default'
                {...props}
            >
                {options.map((option) => (
                    <NativeSelectOption key={option.value} value={option.value}>
                        {option.label}
                    </NativeSelectOption>
                ))}
            </NativeSelect>
            {description && <FieldDescription>{description}</FieldDescription>}
            {field.state.meta.isTouched && !field.state.meta.isValid && (
                <FieldError>{errors[0].message}</FieldError>
            )}
        </Field>
    )
}
