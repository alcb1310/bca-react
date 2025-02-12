export function downloadExcelFile(blob: Blob, fileName: string) {
    const url = URL.createObjectURL(blob)
    // const url = `http://localhost:42069:/public/${fileName}`
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
    URL.revokeObjectURL(url)
}
