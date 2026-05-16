import { Button } from '@/components/ui/button'

export function NotFound() {
    return (
        <div className='space-y-2 p-2'>
            <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
                No Existe
            </h3>
            <p className='leading-7 not-first:mt-6'>
                La p&aacute;gina que desea acceder no existe
            </p>
            <Button variant='default' onClick={() => window.history.back()}>
                Regresar
            </Button>
        </div>
    )
}
