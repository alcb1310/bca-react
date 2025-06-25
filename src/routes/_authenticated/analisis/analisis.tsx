import AnalysisReport from '@/pages/analysis/analysis'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/analisis/analisis')({
  component: AnalysisReport,
})
