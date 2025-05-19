// TODO: update user not working
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import BcaTextField from '~/components/input/BcaTextField/BcaTextField'
import DrawerTitle from '~/components/titles/DrawerTitle/DrawerTitle'
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from '~/queries/user/user'
import { useAppSelector } from '~/redux/hooks'
import ButtonGroup from '~components/buttons/button-group'
import {
  type UserCreate,
  type UserResponse,
  userCreateSchema,
  userResponseSchema,
} from '~types/user'
import BcaDrawer from '../BcaDrawer/BcaDrawer'
import { DevTool } from '@hookform/devtools'

type UsersDrawerProps = {
  open: boolean
  onClose: () => void
  userData: UserResponse | UserCreate
}

export default function UsersDrawer({
  open,
  onClose,
  userData,
}: UsersDrawerProps) {
  const token = useAppSelector((state) => state.login.token)
  const queryClient = useQueryClient()
  const { mutate: createUser } = useMutation({
    mutationFn: useCreateUserMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      reset()
      onClose()
    },
    onError: (error) => {
      setConflictError(error.message)
    },
  })
  const { mutate: updateUser } = useMutation({
    mutationFn: useUpdateUserMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      onClose()
      reset()
    },
    onError: (error) => {
      setConflictError(error.message)
    },
  })
  const [conflictError, setConflictError] = useState<string>('')

  const resolver =
    'id' in userData
      ? zodResolver(userResponseSchema)
      : zodResolver(userCreateSchema)

  const { control, reset, handleSubmit } = useForm<UserCreate | UserResponse>({
    defaultValues: {
      ...userData,
    },
    resolver,
  })

  useEffect(() => {
    setConflictError('')
    reset(userData)
  }, [userData, reset])

  async function hadleSubmit(data: UserCreate | UserResponse) {
    console.log('saving', data)
    setConflictError('')
    if ('password' in data) {
      createUser({ token, user: data })
    } else {
      updateUser({ token, user: data })
    }
  }

  return (
    <>
      <BcaDrawer open={open} onClose={onClose}>
        <DrawerTitle
          title={'password' in userData ? 'Crear usuario' : 'Editar usuario'}
          close={onClose}
        />

        <Box mt={2}>
          <form
            className='w-full flex flex-col gap-5'
            onSubmit={handleSubmit(hadleSubmit)}
          >
            {conflictError && (
              <Typography color='error' variant='body2'>
                {conflictError}
              </Typography>
            )}

            <BcaTextField
              name='email'
              datatestid='component.drawer.user.email'
              label='Email'
              type='email'
              control={control}
              disabled={'id' in userData}
            />

            <BcaTextField
              name='name'
              datatestid='component.drawer.user.name'
              label='Nombre'
              type='text'
              control={control}
            />

            {'password' in userData && (
              <BcaTextField
                name='password'
                datatestid='component.drawer.user.password'
                type='password'
                label='Contraseña'
                disabled={'id' in userData}
                control={control}
              />
            )}

            <ButtonGroup
              saveFunction={handleSubmit(hadleSubmit)}
              cancelFunction={onClose}
            />
          </form>
        </Box>
        <DevTool control={control} />
      </BcaDrawer>
    </>
  )
}
