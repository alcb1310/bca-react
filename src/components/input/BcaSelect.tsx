import { SelectProps } from '@mui/material'
import { BcaField } from '../../types/fields'
//import { Controller } from "react-hook-form"
import BcaTextField from './BcaTextField'

type BcaSelectProps = BcaField<SelectProps>

export default function BcaSelect({
  name,
  label,
  control,
  disabled,
  children,
}: BcaSelectProps) {
  return (
    <BcaTextField name={name} label={label} control={control} select disabled={disabled}>
      {children}
    </BcaTextField>
  )
}
