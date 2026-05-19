import { useStore } from '@tanstack/react-form'
import type { Switch as SwitchPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from '@/components/ui/field'
import { Switch } from '@/components/ui/switch'
import { useFieldContext } from '@/hooks/formHook'

interface SwitchFieldProps extends ComponentProps<typeof SwitchPrimitive.Root> {
	label: string
	description?: string
}

export function SwitchField({
	label,
	description,
	...props
}: Readonly<SwitchFieldProps>) {
	const field = useFieldContext<boolean>()
	const errors = useStore(field.store, (state) => state.meta.errors)

	return (
		<Field className='mt-2'>
			<div className='flex gap-2'>
				<Switch
					checked={field.state.value}
					onCheckedChange={(value) => field.handleChange(value)}
					{...props}
				/>
				<FieldLabel htmlFor={label}> {label} </FieldLabel>
			</div>
			{description && <FieldDescription>{description} </FieldDescription>}
			{field.state.meta.isDirty && errors.length > 0 && (
				<FieldError>{errors} </FieldError>
			)}
		</Field>
	)
}
