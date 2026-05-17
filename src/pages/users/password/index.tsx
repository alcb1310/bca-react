import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ButtonGroup from "@/components/buttons/button-group";
import BcaDrawer from "@/components/drawers/BcaDrawer/BcaDrawer";
import BcaTextField from "@/components/input/BcaTextField";
import DrawerTitle from "@/components/titles/DrawerTitle";
import { UpdatePassword } from "@/queries/users";
import { type PasswordType, passwordSchema } from "@/types/user";

type ChangePasswordProps = {
	onClose: () => void;
};

export default function ChangePassword({ onClose }: ChangePasswordProps) {
	const [open, setOpen] = useState<boolean>(true);
	const { control, reset, handleSubmit } = useForm<PasswordType>({
		defaultValues: {
			password: "",
		},
		resolver: zodResolver(passwordSchema),
	});

	const updatePassword = useMutation({
		mutationFn: UpdatePassword,
		onSuccess: () => {
			toast.success("Contraseña actualizada");
			onClose();
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	useEffect(() => {
		reset();
	}, [reset]);

	function handleClose() {
		setOpen((prev) => !prev);
		onClose();
	}

	function hadleSubmit(data: PasswordType) {
		updatePassword.mutate({ data });
		handleClose();
	}

	return (
		<BcaDrawer open={open} onClose={handleClose}>
			<DrawerTitle title="Cambiar Contraseña" close={handleClose} />

			<Box mt={2}>
				<form
					className="w-full flex flex-col gap-5"
					onSubmit={handleSubmit(hadleSubmit)}
				>
					<BcaTextField
						datatestid="page.user.password.field"
						name="password"
						label="Contraseña"
						type="password"
						control={control}
					/>

					<ButtonGroup
						saveFunction={handleSubmit(hadleSubmit)}
						cancelFunction={handleClose}
					/>
				</form>
			</Box>
		</BcaDrawer>
	);
}
