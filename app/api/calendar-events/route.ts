import { NextResponse } from "next/server"
import ical from "ical"

export async function GET() {
  const CALENDAR_ID = "7fd2e1bde99570af9a77c8305b8dd5229b43df626856dc5ea4d1de84ff3b234c@group.calendar.google.com"
  const ICAL_URL = `https://calendar.google.com/calendar/ical/${CALENDAR_ID}/public/basic.ics`

  try {
    const response = await fetch(ICAL_URL)
    if (!response.ok) {
      throw new Error("Falha ao buscar eventos")
    }

    const icalData = await response.text()
    const parsedEvents = ical.parseICS(icalData)

    const calendarEvents = Object.values(parsedEvents)
      .filter((event: any) => event.type === "VEVENT")
      .map((event: any) => {
        const diffInMilliseconds = Math.abs(event.end.getTime() - event.start.getTime());
        const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
        const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
        let start = new Date(event.start.getTime());
        let end = event.end
        ? new Date(event.end.getTime())
        : new Date(start.getTime() + 2 * 60 * 60 * 1000);
        if (diffInDays === 1) {
          start = new Date(event.start.getTime() + 3 * 60 * 60 * 1000);
          end = new Date(event.start.getTime() + 3 * 60 * 60 * 1000);
        }
        if (diffInHours === 1) {
          end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
        }
        return {
          id: event.uid,
          title: event.summary,
          start,
          end,
          description: event.description,
          location: event.location,
        }
      })

    return NextResponse.json(calendarEvents)
  } catch (error) {
    console.error("Erro ao buscar eventos:", error)
    return NextResponse.json({ error: "Falha ao buscar eventos" }, { status: 500 })
  }
}

