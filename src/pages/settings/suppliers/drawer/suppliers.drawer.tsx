import { Form, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateSupplierType, createSupplier } from "@/types/supplier"
import AlcbDrawer from "@/components/alcbdrawer/alcbdrawer.component"

type SupplierDrawerProps = {
    open: boolean
    closeDrawer: () => void
}

export default function SupplierDrawer({ open, closeDrawer }: SupplierDrawerProps) {
    const formMethods = useForm<CreateSupplierType>({
        resolver: zodResolver(createSupplier)
    })
    return (
        <AlcbDrawer open={open} closeDrawer={closeDrawer} title="Proveedor">
            <Form {...formMethods}>
                Aqui var el formulario
            </Form>
        </AlcbDrawer>
    )
}
