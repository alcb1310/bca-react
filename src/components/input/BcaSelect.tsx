import { FormControl, InputLabel, Select, SelectProps } from "@mui/material"
import { BcaField } from "../../types/fields"
import { Controller } from "react-hook-form"

type BcaSelectProps = BcaField<SelectProps>

export default function BcaSelect({
  name,
  label,
  control,
  children,
  ...rest
}: BcaSelectProps) {
  const labelId = `${name}-label`
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl size="small" fullWidth>
          <InputLabel id={labelId}>{label}</InputLabel>
          <Select
            labelId={labelId}
            label={label}
            {...field}
            {...rest}
          >
            {children}
          </Select>
        </FormControl>
      )}
    />
  )
}
