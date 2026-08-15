/**
 * Checks if the restaurant is open on the current or upcoming Sunday.
 * Uses an alternating weekly schedule based on weeks since the start of the year.
 */
export function isOpenThisSunday(targetDate = new Date()) {
  const startOfYear = new Date(targetDate.getFullYear(), 0, 1);
  const weeksSinceStart = Math.floor(
    (targetDate.getTime() - startOfYear.getTime()) / (7 * 24 * 60 * 60 * 1000)
  );
  return weeksSinceStart % 2 === 0;
}

/**
 * Calculates the next Sunday date relative to today.
 */
export function getNextSundayDate(fromDate = new Date()) {
  const today = new Date(fromDate);
  const day = today.getDay();
  // If today is Sunday (day 0), return today if it's still Sunday, or compute upcoming
  const daysUntilNextSunday = (7 - day) % 7;
  const nextSunday = new Date(today.getTime() + daysUntilNextSunday * 24 * 60 * 60 * 1000);
  nextSunday.setHours(0, 0, 0, 0);
  return nextSunday;
}

/**
 * Returns a forecast list of the upcoming N Sundays with their open/closed status.
 */
export function getUpcomingSundays(count = 4) {
  const sundays = [];
  let currentSunday = getNextSundayDate();
  
  // If today is Sunday and already past or present
  const today = new Date();
  if (today.getDay() === 0) {
    currentSunday = new Date(today);
    currentSunday.setHours(0, 0, 0, 0);
  }

  for (let i = 0; i < count; i++) {
    const d = new Date(currentSunday.getTime() + i * 7 * 24 * 60 * 60 * 1000);
    const isOpen = isOpenThisSunday(d);
    sundays.push({
      date: d,
      formattedDate: formatDate(d),
      shortDate: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      isOpen,
      isNext: i === 0
    });
  }
  return sundays;
}

/**
 * Determines real-time opening status with detailed messages.
 */
export function getRealtimeStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 is Sunday, 1 is Monday, ...
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentMinutes = hour * 60 + minute;
  const openMinutes = 8 * 60;   // 8:00 AM
  const closeMinutes = 20 * 60; // 8:00 PM

  // Sunday
  if (day === 0) {
    const isSundayOpen = isOpenThisSunday(now);
    if (!isSundayOpen) {
      return {
        isOpen: false,
        statusText: "Closed Today",
        badgeColor: "bg-red-500/10 text-red-600 border-red-500/20",
        message: "We alternate Sunday openings. We are closed today.",
        nextOpenTime: "Opens Monday at 8:00 AM",
        closingIn: null,
        isSundayClosed: true
      };
    }

    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      const minutesLeft = closeMinutes - currentMinutes;
      const hoursLeft = Math.floor(minutesLeft / 60);
      const minsLeft = minutesLeft % 60;
      return {
        isOpen: true,
        statusText: "Open Now",
        badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
        message: `Sunday Special Service! Closes at 8:00 PM (${hoursLeft > 0 ? `${hoursLeft}h ` : ""}${minsLeft}m remaining)`,
        nextOpenTime: "Open until 8:00 PM",
        closingIn: minutesLeft
      };
    }

    if (currentMinutes < openMinutes) {
      return {
        isOpen: false,
        statusText: "Closed Now",
        badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
        message: "We're open today from 8:00 AM - 8:00 PM.",
        nextOpenTime: "Opens today at 8:00 AM",
        closingIn: null
      };
    }

    return {
      isOpen: false,
      statusText: "Closed for the Night",
      badgeColor: "bg-red-500/10 text-red-600 border-red-500/20",
      message: "Closed for today. See you Monday at 8:00 AM!",
      nextOpenTime: "Opens Monday at 8:00 AM",
      closingIn: null
    };
  }

  // Weekdays (Monday - Saturday)
  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    const minutesLeft = closeMinutes - currentMinutes;
    const hoursLeft = Math.floor(minutesLeft / 60);
    const minsLeft = minutesLeft % 60;
    return {
      isOpen: true,
      statusText: "Open Now",
      badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      message: `Open for Dine-in & Takeout (${hoursLeft > 0 ? `${hoursLeft}h ` : ""}${minsLeft}m remaining)`,
      nextOpenTime: "Open until 8:00 PM",
      closingIn: minutesLeft
    };
  }

  if (currentMinutes < openMinutes) {
    return {
      isOpen: false,
      statusText: "Closed Now",
      badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      message: "Early morning prep. Doors open at 8:00 AM.",
      nextOpenTime: "Opens today at 8:00 AM",
      closingIn: null
    };
  }

  return {
    isOpen: false,
    statusText: "Closed for the Night",
    badgeColor: "bg-red-500/10 text-red-600 border-red-500/20",
    message: "Closed for the night. Opening tomorrow at 8:00 AM.",
    nextOpenTime: "Opens tomorrow at 8:00 AM",
    closingIn: null
  };
}

export function formatDate(date) {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function formatNaira(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}