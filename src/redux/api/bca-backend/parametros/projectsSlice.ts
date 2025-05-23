import type { ProjectType } from '~types/project'
import { bcaApiSlice } from '../bcaSlice'

const projectApiSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    updateProject: builder.mutation<ProjectType, ProjectType>({
      query: (project) => {
        return {
          url: `/parametros/proyectos/${project.id}`,
          method: 'PUT',
          body: project,
        }
      },

      invalidatesTags: ['proyectos'],
    }),
  }),
})

export const { useUpdateProjectMutation } = projectApiSlice
