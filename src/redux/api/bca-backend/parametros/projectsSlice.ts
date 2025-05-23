import type { ProjectType } from '~types/project'
import { bcaApiSlice } from '../bcaSlice'

const projectApiSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createProject: builder.mutation<ProjectType, ProjectType>({
      query: (project) => {
        return {
          url: '/parametros/proyectos',
          method: 'POST',
          body: project,
        }
      },

      invalidatesTags: ['proyectos'],
    }),

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

export const { useCreateProjectMutation, useUpdateProjectMutation } =
  projectApiSlice
