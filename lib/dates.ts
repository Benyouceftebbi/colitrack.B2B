// Safely coerce any Firestore/JS date-ish value into a real JS Date.
//
// Firestore values can arrive in several shapes depending on how/where they
// were read: a Timestamp instance (has .toDate()), a plain { seconds, nanoseconds }
// object (after JSON serialization or coming from the REST layer), a Date, a
// number (epoch millis), or an ISO string. Calling `.toDate()` blindly crashes
// when the value isn't a Timestamp — this helper never throws.

export function toJsDate(value: any): Date {
  // Firestore Timestamp instance
  if (value && typeof value.toDate === "function") {
    return value.toDate();
  }

  // Serialized Firestore timestamp: { seconds, nanoseconds }
  if (value && typeof value.seconds === "number") {
    const nanos = typeof value.nanoseconds === "number" ? value.nanoseconds : 0;
    return new Date(value.seconds * 1000 + nanos / 1e6);
  }

  // Already a Date
  if (value instanceof Date) {
    return value;
  }

  // Epoch millis or ISO / parseable string
  if (typeof value === "number" || typeof value === "string") {
    const d = new Date(value);
    if (!isNaN(d.getTime())) return d;
  }

  // Fallback: current time (avoids crashing on undefined/null/garbage)
  return new Date();
}
