import { useState, useEffect } from "react"

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  description?: string
  location?: string
}

export function useGoogleCalendarEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/calendar-events")
        if (!response.ok) {
          throw new Error("Falha ao buscar eventos")
        }

        const data = await response.json()
        const calendarEvents: CalendarEvent[] = data.map((event: any) => ({
          id: event.id,
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end),
          description: event.description,
          location: event.location,
        }))
        console.log(calendarEvents);
        setEvents(calendarEvents)
        setLoading(false)
      } catch (err) {
        setError(err as Error)
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return { events, loading, error }
}

