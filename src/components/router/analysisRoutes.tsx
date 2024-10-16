import { RouteObject } from 'react-router-dom'
import Analysis from '../../pages/analysis'
import Quantity from '../../pages/analysis/quantity'
import AnalysisReport from '../../pages/analysis/analysis'

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
