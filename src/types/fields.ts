import { ReactNode } from 'react'

export type BcaFieldBase<T> = T & {
  helperText?: ReactNode
  control?: any
}

export type BcaField<T> = T & {
  name: string
  datatestid?: string
} & BcaFieldBase<T>
