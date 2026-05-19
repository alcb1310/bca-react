import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { FormButton } from '@/components/forms/Button'
import { SelectField } from '@/components/forms/SelectField'
import { SwitchField } from '@/components/forms/SwitchField'
import { TextField } from '@/components/forms/TextField'

export const { fieldContext, formContext, useFormContext, useFieldContext } =
	createFormHookContexts()

export const { useAppForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		SelectField,
		SwitchField,
		TextField,
	},
	formComponents: { FormButton },
})
