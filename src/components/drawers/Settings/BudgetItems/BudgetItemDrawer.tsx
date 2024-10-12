import { Box, FormControlLabel, MenuItem } from "@mui/material";
import DrawerTitle from "../../../titles/DrawerTitle";
import BcaDrawer from "../../BcaDrawer/BcaDrawer";
import ButtonGroup from "../../../buttons/button-group";
import BcaTextField from "../../../input/BcaTextField";
import { useForm } from "react-hook-form";
import { BudgetItem } from "../../../../types/partidas";
import { useEffect } from "react";
import { RhfSwitch } from "mui-rhf-integration";
import BcaSelect from "../../../input/BcaSelect";

type BudgetItemDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function BudgetItemDrawer({
  open,
  onClose,
}: BudgetItemDrawerProps) {
  const { control, reset, handleSubmit } = useForm<BudgetItem>({
    defaultValues: {
      code: "",
      name: "",
      parentId: "",
      accumulates: false,
    },
  });

  useEffect(() => {
    reset();
  }, []);

  function hadleSubmit(data: BudgetItem) {
    console.log(data);
  }

  return (
    <BcaDrawer open={open} onClose={onClose}>
      <DrawerTitle title="Crear Partida" close={onClose} />

      <Box mt={2}>
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={handleSubmit(hadleSubmit)}
        >
          <BcaTextField name="code" label="Código" control={control} />

          <BcaTextField name="name" label="Nombre" control={control} />

          <BcaSelect name="parentId" label="Padre" control={control}>
            <MenuItem value={""}>---Seleccione---</MenuItem>
            <MenuItem value="b3fcdc7f-dc62-470d-8a17-71ac2f470432b3fcdc7f-dc62-470d-8a17-71ac2f470432">
              Partida 1
            </MenuItem>
          </BcaSelect>

          <FormControlLabel
            name="accumulates"
            labelPlacement="end"
            label="Acumula"
            control={
              <RhfSwitch name="accumulates" control={control} size="small" />
            }
          />

          <ButtonGroup
            saveFunction={handleSubmit(hadleSubmit)}
            cancelFunction={onClose}
          />
        </form>
      </Box>
    </BcaDrawer>
  );
}
