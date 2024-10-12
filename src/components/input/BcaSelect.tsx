import { FormControl, FormHelperText, InputLabel, Select, SelectProps } from "@mui/material"
import { BcaField } from "../../types/fields"
import { Controller } from "react-hook-form"

type BcaSelectProps = BcaField<SelectProps>

export default function BcaSelect({
  name,
  control,
  label,
  children,
  ...rest
}: BcaSelectProps) {
  const labelId = `${name}-name`
  return (
    <FormControl size="small">
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({
          fieldState: { error },
        }) => (
          <>
            <Select labelId={labelId} label={label} {...rest}>
              {children}
            </Select>
            <FormHelperText
                error={!!error}
                component="span"
                variant="standard"
            >
              {error?.message}
            </FormHelperText>
          </>
        )}
      />
    </FormControl>
  )
}
