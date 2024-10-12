import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Typography } from "@mui/material";

import BcaDrawer from "../BcaDrawer/BcaDrawer";
import { UserCreate, userCreateSchema, UserResponse, userResponseSchema } from "../../../types/user";
import DrawerTitle from "../../titles/DrawerTitle";
import ButtonGroup from "../../buttons/button-group";
import { useCreateUserMutation, useUpdateUserMutation } from "../../../redux/api/bca-backend/user/userSlice";
import BcaTextField from "../../input/BcaTextField";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const [createUser] = useCreateUserMutation()
  const [updateUser] = useUpdateUserMutation()
  const [conflictError, setConflictError] = useState<string>('')

  const resolver = 'id' in userData ? zodResolver(userResponseSchema) : zodResolver(userCreateSchema)

  const { control, reset, handleSubmit } = useForm<UserCreate | UserResponse>({
    defaultValues: {
      ...userData
    },
    resolver,
  })

  useEffect(() => {
    setConflictError('')
    reset(userData)
  }, [userData])

  async function hadleSubmit(data: UserCreate | UserResponse) {
    setConflictError('')
    if ('password' in data) {
      const res = await createUser(data)
      if ('data' in res) {
        onClose()
        reset()
        return
      }

      // @ts-ignore
      setConflictError(res.error.data.error)
    } else {
      const res = await updateUser(data)
      if ('data' in res) {
        onClose()
        reset()
        return
      }
    }
  }

  return (
    <BcaDrawer open={open} onClose={onClose}>
      <DrawerTitle
        title={'password' in userData ? "Crear usuario" : "Editar usuario"}
        close={onClose}
      />

      <Box mt={2}>
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={handleSubmit(hadleSubmit)}
        >
          {conflictError && <Typography color="error" variant="body2">{conflictError}</Typography>}

          <BcaTextField
            name="email"
            label="Email"
            type="email"
            control={control}
            disabled={'id' in userData}
          />

          <BcaTextField
            name="name"
            label="Nombre"
            type="text"
            control={control}
          />

          {'password' in userData && <BcaTextField
            name="password"
            type="password"
            label="Contraseña"
            disabled={'id' in userData}
            control={control}
          />}

          <ButtonGroup
            saveFunction={handleSubmit(hadleSubmit)}
            cancelFunction={onClose}
          />
        </form>
      </Box>
    </BcaDrawer>
  )
}
