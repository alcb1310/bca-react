import { bcaApiSlice } from '../bcaSlice'
import { ProjectType } from '~types/project'

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

export const {
    useGetAllProjectsQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
} = projectApiSlice
