import { Box, FormControlLabel, MenuItem } from "@mui/material";
import DrawerTitle from "../../../titles/DrawerTitle";
import BcaDrawer from "../../BcaDrawer/BcaDrawer";
import ButtonGroup from "../../../buttons/button-group";
import BcaTextField from "../../../input/BcaTextField";
import { useForm } from "react-hook-form";
import { BudgetItem } from "../../../../types/partidas";
import { useEffect } from "react";
import { RhfSwitch } from "mui-rhf-integration";
import BcaSwitch from "../../../input/BcaSwitch";
import BcaSelect from "../../../input/BcaSelect";
// import BcaSwitch from "../../../input/BcaSwitch";

type BudgetItemDrawerProps = {
  open: boolean
  onClose: () => void
}

export default function BudgetItemDrawer({
  open,
  onClose,
}: BudgetItemDrawerProps) {
  const { control, reset, handleSubmit } = useForm<BudgetItem>({})

  useEffect(() => {
    reset()
  }, [])

  function hadleSubmit(data: BudgetItem) {
    console.log(data)
  }

  return (
    <BcaDrawer
      open={open}
      onClose={onClose}
    >
      <DrawerTitle
        title="Crear Partida"
        close={onClose}
      />

      <Box mt={2}>
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={handleSubmit(hadleSubmit)}
        >
          <BcaTextField
            name="code"
            label="Código"
            control={control}
          />

          <BcaTextField
            name="name"
            label="Nombre"
            control={control}
          />

          <BcaSelect
            name="parent"
            label="Padre"
            control={control}
          >
            <MenuItem value="">---Seleccione---</MenuItem>
          </BcaSelect>

          <FormControlLabel
            name="accumulates"
            labelPlacement="end"
            label="Acumula"
            control={
              <RhfSwitch
                name="accumulates"
                control={control}
                size="small"
              />

            }
          />



          <ButtonGroup
            saveFunction={handleSubmit(hadleSubmit)}
            cancelFunction={onClose}
          />
        </form>
      </Box>
    </BcaDrawer>
  )
}
