import { ProjectType } from '../../../../types/project'
import { bcaApiSlice } from '../bcaSlice'

const projectApiSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProjects: builder.query<ProjectType[], void>({
      query: () => {
        return {
          url: '/parametros/proyectos',
          method: 'GET',
        }
      },

      providesTags: ['proyectos'],
    }),

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
  }),
})

export const { useGetAllProjectsQuery, useCreateProjectMutation } =
  projectApiSlice
