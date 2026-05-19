import { useStore } from '@tanstack/react-form'
import type { ComponentProps } from 'react'
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useFieldContext } from '@/hooks/formHook'

interface TextFieldProps extends ComponentProps<'input'> {
	name: string
	label: string
	description?: string
}

export function TextField({
	name,
	label,
	description,
	...props
}: TextFieldProps) {
	const field = useFieldContext<string>()
	const errors = useStore(field.store, (state) => state.meta.errors)

	return (
		<Field>
			<FieldLabel htmlFor={name}>{label}</FieldLabel>
			<Input
				name={name}
				autoComplete='off'
				value={field.state.value}
				onChange={(e) => field.handleChange(e.target.value)}
				className={errors.length ? 'border-destructive' : ''}
				{...props}
			/>
			{description && <FieldDescription>{description}</FieldDescription>}
			{field.state.meta.isTouched && !field.state.meta.isValid && (
				<FieldError>{errors[0].message}</FieldError>
			)}
		</Field>
	)
}
