import { createFileRoute } from '@tanstack/react-router'
import { FormBackground } from '@/components/ui/form-background'
import PageTitle from '@/components/web/pageTitle'
import { GetAllProjects } from '@/queries/parametros/projects'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlayIcon } from 'lucide-react'
import { toast } from 'sonner'
import { GetAnalisis } from '@/queries/analisis/cantidades'
import { Spinner } from '@/components/ui/spinner'
import { AnalisisCollapsible } from '@/components/web/analisis-collapse'

export const Route = createFileRoute('/_auth/analisis/analisis')({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) => {
		queryClient.prefetchQuery({
			queryKey: ['proyectos'],
			queryFn: () => GetAllProjects({ data: { active: true } }),
		})
	},
	shouldReload: true,
	gcTime: 0,
	preloadStaleTime: 0,
})

function RouteComponent() {
	const [project, setProject] = useState<string>('')
	const { data: projects } = useSuspenseQuery({
		queryKey: ['proyectos'],
		queryFn: () => GetAllProjects({ data: { active: true } }),
	})

	const { data, isLoading, isFetching, refetch } = useQuery({
		queryKey: ['analisis'],
		queryFn: () => GetAnalisis({ data: { id: project } }),
		enabled: false,
	})

	const proyValues =
		projects?.map((item) => ({
			label: item.name,
			value: item.id as string,
		})) || []
	proyValues.unshift({
		label: 'Seleccione un proyecto',
		value: '',
	})

	const show = data?.map((item) => (
		<AnalisisCollapsible key={item.key} data={item} />
	))

	return (
		<div>
			<PageTitle title='Analisis' />
			<FormBackground>
				<NativeSelect
					name={'proyectos'}
					className='w-full'
					size='default'
					value={project}
					onChange={(e) => {
						setProject(e.target.value)
					}}
				>
					{proyValues.map((option) => (
						<NativeSelectOption key={option.value} value={option.value}>
							{option.label}
						</NativeSelectOption>
					))}
				</NativeSelect>
				<div className='my-4 flex justify-start gap-4'>
					<Button
						onClick={(e) => {
							e.preventDefault()
							e.stopPropagation()

							if (!project) {
								toast.error('Seleccione un proyecto', {
									position: 'top-center',
									style: {
										color: 'red',
									},
								})
							}
							refetch()
						}}
					>
						<PlayIcon size={16} />
						Generar
					</Button>
				</div>
			</FormBackground>
			{(isLoading || isFetching) && <Spinner />}
			{show}
		</div>
	)
}
