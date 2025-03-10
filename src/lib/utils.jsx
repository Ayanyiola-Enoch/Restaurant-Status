export function isOpenThisSunday() {
    const today = new Date()
    const startOfYear = new Date(today.getFullYear(), 0, 1)
    const weeksSinceStart = Math.floor((today.getTime() - startOfYear.getTime()) / (7 * 24 * 60 * 60 * 1000))
    return weeksSinceStart % 2 === 0
  }
  
  export function getNextSundayDate() {
    const today = new Date()
    const daysUntilNextSunday = (7 - today.getDay()) % 7
    return new Date(today.getTime() + daysUntilNextSunday * 24 * 60 * 60 * 1000)
  }
  
  export function formatDate(date) {
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  }
  
  