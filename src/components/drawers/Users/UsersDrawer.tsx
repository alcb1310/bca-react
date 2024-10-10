import BcaDrawer from "../BcaDrawer/BcaDrawer";
import { UserCreate, UserResponse } from "../../../types/user";
import DrawerTitle from "../../titles/DrawerTitle";
import ButtonGroup from "../../buttons/button-group";

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
  // TODO: create the users drawer
  return (
    <BcaDrawer open={open} onClose={onClose}>
      <DrawerTitle
        title={'password' in userData ? "Crear usuario" : "Editar usuario"}
        close={onClose}
      />

      <ButtonGroup
        saveFunction={() => {}}
        cancelFunction={onClose}
      />
    </BcaDrawer>
  )
}
