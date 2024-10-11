import { useEffect, useState } from "react";
import BcaDrawer from "../../../components/drawers/BcaDrawer/BcaDrawer";
import DrawerTitle from "../../../components/titles/DrawerTitle";
import ButtonGroup from "../../../components/buttons/button-group";
import { useForm } from "react-hook-form";
import { passwordSchema, PasswordType } from "../../../types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import BcaTextField from "../../../components/input/BcaTextField";
import { useUpdatePasswordMutation } from "../../../redux/api/bca-backend/user/userSlice";

type ChangePasswordProps = {
  onClose: () => void
}

export default function ChangePassword({ onClose }: ChangePasswordProps) {
  const [open, setOpen] = useState<boolean>(true)
  const { control, reset, handleSubmit } = useForm<PasswordType>({
    defaultValues: {
      password: ''
    },
    resolver: zodResolver(passwordSchema)
  })

  const [updatePassword] = useUpdatePasswordMutation()

  useEffect(() => {
    reset()
  }, [])

  function handleClose() {
    setOpen(prev => !prev)
    onClose()
  }

  function hadleSubmit(data: PasswordType) {
    updatePassword(data)
    handleClose()
  }

  return (
    <BcaDrawer
      open={open}
      onClose={handleClose}
    >
      <DrawerTitle
        title="Cambiar Contraseña"
        close={handleClose}
      />

      <Box mt={2}>
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={handleSubmit(hadleSubmit)}
        >
          <BcaTextField
            name="password"
            label="Contraseña"
            type="password"
            control={control}
          />

          <ButtonGroup
            saveFunction={handleSubmit(hadleSubmit)}
            cancelFunction={handleClose} />
        </form>
      </Box>
    </BcaDrawer>
  )
}
