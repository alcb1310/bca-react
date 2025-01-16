export function normalizeDate(dt: Date): string {
    let day = dt.getDate().toString()
    if (day.length === 1) day = `0${day}`

    let month = (dt.getMonth() + 1).toString()
    if (month.length === 1) month = `0${month}`

    const year = dt.getFullYear().toString()

    return `${year}-${month}-${day}`
}
