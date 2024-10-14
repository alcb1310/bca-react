import { ProjectType } from "../../../../types/project";
import { bcaApiSlice } from "../bcaSlice";

const projectApiSlice = bcaApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    getAllProjects: builder.query<ProjectType[], void>({
      query: () => {
        return {
          url: "/parametros/proyectos",
          method: "GET",
        }
      },

      providesTags: ["proyectos"],
    }),


  }),
})

export const { useGetAllProjectsQuery } = projectApiSlice
