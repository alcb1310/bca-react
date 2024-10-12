import {
  Box,
  CircularProgress,
  FormControlLabel,
  MenuItem,
} from "@mui/material";
import DrawerTitle from "../../../titles/DrawerTitle";
import BcaDrawer from "../../BcaDrawer/BcaDrawer";
import ButtonGroup from "../../../buttons/button-group";
import BcaTextField from "../../../input/BcaTextField";
import { useForm } from "react-hook-form";
import { BudgetItem, budgetItemSchema } from "../../../../types/partidas";
import { useEffect } from "react";
import { RhfSwitch } from "mui-rhf-integration";
import BcaSelect from "../../../input/BcaSelect";
import { DevTool } from "@hookform/devtools";
import {
  useCreateBudgetItemMutation,
  useGetAllBudgetItemsByAccumulateQuery,
  useUpdateBudgetItemMutation,
} from "../../../../redux/api/bca-backend/parametros/budgetItemSlice";
import { zodResolver } from "@hookform/resolvers/zod";

type BudgetItemDrawerProps = {
  open: boolean;
  onClose: () => void;
  defaultValues: BudgetItem;
};

export default function BudgetItemDrawer({
  open,
  onClose,
  defaultValues,
}: BudgetItemDrawerProps) {
  const { control, reset, handleSubmit } = useForm<BudgetItem>({
    defaultValues,
    resolver: zodResolver(budgetItemSchema),
  });

  const [createBudgetItem] = useCreateBudgetItemMutation();
  const [updateBudgetItem] = useUpdateBudgetItemMutation();
  const { data, isLoading } = useGetAllBudgetItemsByAccumulateQuery({
    accumulate: true,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  async function hadleSubmit(data: BudgetItem) {
    // TODO: Handle server errors
    if (defaultValues.id) {
      await updateBudgetItem(data);
      onClose();
      return;
    }
    const res = await createBudgetItem(data);
    onClose();
  }

  return (
    <BcaDrawer open={open} onClose={onClose}>
      <DrawerTitle title="Crear Partida" close={onClose} />

      <Box mt={2}>
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={handleSubmit(hadleSubmit)}
        >
          {isLoading && <CircularProgress />}

          <BcaTextField name="code" label="Código" control={control} />

          <BcaTextField name="name" label="Nombre" control={control} />

          <BcaSelect
            name="parent_id"
            label="Padre"
            control={control}
            disabled={defaultValues.id ? true : false}
          >
            <MenuItem value={""}>---Seleccione---</MenuItem>
            {data?.map((budgetItem) => (
              <MenuItem key={budgetItem.id} value={budgetItem.id}>
                {budgetItem.name}
              </MenuItem>
            ))}
          </BcaSelect>

          <FormControlLabel
            name="accumulates"
            labelPlacement="end"
            label="Acumula"
            control={
              <RhfSwitch name="accumulate" control={control} size="small" />
            }
          />

          <ButtonGroup
            saveFunction={handleSubmit(hadleSubmit)}
            cancelFunction={onClose}
          />
        </form>
      </Box>
      <DevTool control={control} />
    </BcaDrawer>
  );
}
