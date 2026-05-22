import { ReactNode } from "react";

export function FormBackground({ children }: { children: ReactNode }) {
    return <div className='w-1/2 mx-auto my-3 p-3 bg-sidebar-primary-foreground '>
        {children}
    </div>
}
