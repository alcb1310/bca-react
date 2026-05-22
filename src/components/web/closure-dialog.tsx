import { InfoIcon, SaveIcon } from 'lucide-react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { GetOneProject } from '@/queries/parametros/projects'
import { CreateClosure } from '@/queries/transacciones/closure'
import { toast } from 'sonner'

type ClosureDialogProps = {
	projectId: string
	date: string
}

export function ClosureDalog({ projectId, date }: ClosureDialogProps) {
	const { data } = useQuery({
		queryKey: ['proyectos', projectId],
		queryFn: () => GetOneProject(projectId),
	})

	const useGenerateClosureMutation = useMutation({
		mutationFn: CreateClosure,
		onSuccess: () => {
			toast.success('Cierre creado exitosamente')
		},
		onError: (error) => {
			toast.error(error.message, {
				position: 'top-center',
				style: {
					color: 'red',
				},
			})
		},
	})

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button type='submit'>
					<SaveIcon size={10} />
					Generar Cierre
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogMedia className='bg-white'>
						<InfoIcon size={16} className='bg-white text-primary' />
					</AlertDialogMedia>
					<AlertDialogTitle className='text-text-primary'>
						Generar Cierre
					</AlertDialogTitle>
					<AlertDialogDescription>
						¿Desea generar el cierre del proyecto{' '}
						<span className='font-bold'>{data?.name}</span> para la fecha&nbsp;
						<span className='font-bold'>{date}</span>?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						onClick={() =>
							useGenerateClosureMutation.mutate({
								data: {
									project_id: projectId,
									date: new Date(date),
								},
							})
						}
					>
						Generar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
