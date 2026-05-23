import { createServerFn } from '@tanstack/react-start'
import z from 'zod'
import { getInformation } from '@/utils/token'

export const reportSchema = z.object({
	project_id: z
		.string({ message: 'Seleccione un proyecto' })
		.uuid('Seleccione un proyecto'),
	level: z
		.string({ message: 'Seleccione un nivel' })
		.min(1, 'Seleccione un nivel'),
})
export type ReportTypes = z.infer<typeof reportSchema>

export const exportClick = createServerFn({ method: 'GET' })
	.inputValidator((data: ReportTypes) => data)
	.handler(async ({ data }) => {
		const { token, URL } = await getInformation()
		const res = await fetch(
			`${URL}/reportes/excel/actual?proyecto=${data.project_id}&nivel=${data.level}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		if (!res.ok) {
			const error = await res.json()
			throw new Error(error.error)
		}

		const blob = await res.blob()

		return new Response(blob, {
			status: 200,
			headers: {
				'Content-Type':
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'Content-Disposition': 'attachment; filename="reporte.xlsx"',
			},
		})
	})
