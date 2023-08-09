import { useForm } from "react-hook-form";
import { LoginSchemaType, loginSchema } from "./loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useLoginForm() {
    return useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ""
        }
    })
}
