import { useState } from "react";
import { SettingsOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Button, CssBaseline, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getHomePage } from "./query/home";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-form-adapter";

export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const { isPending, error, data } = useQuery({
    queryKey: ["home"],
    queryFn: getHomePage,
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
    },
    validatorAdapter: zodValidator(),
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <CssBaseline />
      <h1 data-testid="title" className="text-green-800 text-3xl font-bold">
        Hello world!
      </h1>
      <Button
        variant="contained"
        endIcon={<SettingsOutlined />}
        size="small"
        color="primary"
        data-testid="button"
      >
        Contained
      </Button>
      <p data-testid="message">{data.message}</p>
      <form
        data-testid="form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="email"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string().email("Correo inválido"),
          }}
          children={(field) => (
            <TextField
              label="Email"
              className="w-full"
              variant="outlined"
              size="small"
              data-testid="email"
              defaultValue={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Email"
              error={field.state.meta.isTouched && field.state.meta.errors.length > 0}
              helperText={field.state.meta.isTouched && field.state.meta.errors}
            />
          )}
        />

        <form.Field
          name="password"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string().min(3, "Minimo 3 caracteres"),
          }}
          children={(field) => (
            <TextField
              label="Password"
              className="w-full"
              variant="outlined"
              size="small"
              data-testid="password"
              type={showPassword ? "text" : "password"}
              defaultValue={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Password"
              error={field.state.meta.isTouched && field.state.meta.errors.length > 0}
              helperText={field.state.meta.isTouched && field.state.meta.errors}
              InputProps={{
                endAdornment: <VisibilityOutlined className="hover:cursor-pointer" onClick={() => setShowPassword(!showPassword)} />,
              }}
            />
          )}
        />

        <Button
          type="submit"
          data-testid="submit"
          variant="contained"
          color="primary"
          size="small"
        >
          Submit
        </Button>
      </form>
    </>
  );
}
