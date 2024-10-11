import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Typography } from "@mui/material";

import BcaDrawer from "../BcaDrawer/BcaDrawer";
import { UserCreate, UserResponse } from "../../../types/user";
import DrawerTitle from "../../titles/DrawerTitle";
import ButtonGroup from "../../buttons/button-group";
import { useCreateUserMutation } from "../../../redux/api/bca-backend/user/userSlice";
import BcaTextField from "../../input/BcaTextField";

type UsersDrawerProps = {
  open: boolean
  onClose: () => void
  userData: UserResponse | UserCreate
}
// TODO: add user edit

export default function UsersDrawer({
  open,
  onClose,
  userData,
}: UsersDrawerProps) {
  const [createUser] = useCreateUserMutation()
  const [conflictError, setConflictError] = useState<string>('')

  // TODO: add form validation
  const { control, reset, handleSubmit } = useForm<UserCreate | UserResponse>({
    defaultValues: {
      ...userData
    }
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
            type="email"
            control={control}
          />

          <BcaTextField
            name="password"
            type="password"
            disabled={'id' in userData}
            control={control}
          />

          <BcaTextField
            name="name"
            type="text"
            control={control}
          />

          <ButtonGroup
            saveFunction={() => { }}
            cancelFunction={onClose}
          />
        </form>
      </Box>
    </BcaDrawer>
  )
}
