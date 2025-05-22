import { zodResolver } from '@hookform/resolvers/zod'
import { Box } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import BcaTextField from '~/components/input/BcaTextField/BcaTextField'
import DrawerTitle from '~/components/titles/DrawerTitle/DrawerTitle'
import { useUpdatePasswordMutation } from '~/queries/user/user'
import { useAppSelector } from '~/redux/hooks'
import ButtonGroup from '~components/buttons/button-group'
import BcaDrawer from '~components/drawers/BcaDrawer/BcaDrawer'
import { type PasswordType, passwordSchema } from '~types/user'

type ChangePasswordProps = {
  onClose: () => void
}

export default function ChangePassword({ onClose }: ChangePasswordProps) {
  const token = useAppSelector((state) => state.login.token)
  const [open, setOpen] = useState<boolean>(true)
  const { control, reset, handleSubmit } = useForm<PasswordType>({
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(passwordSchema),
  })

  const { mutate } = useMutation({
    mutationFn: useUpdatePasswordMutation,
    onSuccess: () => {
      handleClose()
    },
    // onError: (error) => { },
  })

  useEffect(() => {
    reset()
  }, [])

  function handleClose() {
    setOpen((prev) => !prev)
    onClose()
  }

  function hadleSubmit(data: PasswordType) {
    mutate({ token, password: data })
  }

  return (
    <BcaDrawer open={open} onClose={handleClose}>
      <DrawerTitle title='Cambiar Contraseña' close={handleClose} />

      <Box mt={2}>
        <form
          className='w-full flex flex-col gap-5'
          onSubmit={handleSubmit(hadleSubmit)}
        >
          <BcaTextField
            datatestid='page.user.password.field'
            name='password'
            label='Contraseña'
            type='password'
            control={control}
          />

          <ButtonGroup
            saveFunction={handleSubmit(hadleSubmit)}
            cancelFunction={handleClose}
          />
        </form>
      </Box>
    </BcaDrawer>
  )
}
