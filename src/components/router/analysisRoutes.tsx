import Analysis from '@/pages/analysis'
import AnalysisReport from '@/pages/analysis/analysis'
import Quantity from '@/pages/analysis/quantity'
import type { RouteObject } from 'react-router-dom'

export const analysisRoutes: RouteObject = {
  path: 'analisis',
  children: [
    {
      index: true,
      element: <Analysis />,
    },
    {
      path: 'cantidad',
      element: <Quantity />,
    },
    {
      path: 'analisis',
      element: <AnalysisReport />,
    },
  ],
}
