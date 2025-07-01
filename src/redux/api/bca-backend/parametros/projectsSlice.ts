import type { ProjectType } from '@/types/project'
import { bcaApiSlice } from '../bcaSlice'

const projectApiSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProjects: builder.query<
      ProjectType[],
      { query?: string; active?: boolean }
    >({
      query: (body) => {
        return {
          url: '/parametros/proyectos',
          method: 'GET',
          params: {
            query: body.query,
            active: body.active,
          },
        }
      },

      providesTags: ['proyectos'],
    }),
  }),
})

export const { useGetAllProjectsQuery } = projectApiSlice
