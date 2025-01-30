"use client"

import { useState, useMemo, useEffect } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "moment/locale/pt-br"
import { useGoogleCalendarEvents } from "../hooks/useGoogleCalendarEvents"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Wheat, CalendarIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Set the locale and timezone
moment.locale("pt-br")

const messages = {
  allDay: "Dia inteiro",
  previous: "Anterior",
  next: "Próximo",
  today: "Hoje",
  month: "Mês",
  week: "Semana",
  day: "Dia",
  agenda: "Agenda",
  date: "Data",
  time: "Hora",
  event: "Evento",
  showMore: (total: number) => `+${total} mais`,
  noEventsInRange: "Não há eventos neste período.",
}

const localizer = momentLocalizer(moment)

interface EventDetails {
  title: string
  start: Date
  end: Date
  description?: string
  location?: string
}

const locationColors: { [key: string]: string } = {
  "Igreja Sede": "#D4AF37", // Gold
  "Congregação 1": "#8B4513", // Saddle Brown
  "Congregação 2": "#DAA520", // Goldenrod
  "Congregação 3": "#B8860B", // Dark Goldenrod
  "Congregação 4": "#CD853F", // Peru
  "Congregação 5": "#DEB887", // Burlywood
  "Congregação 6": "#F4A460", // Sandy Brown
  "Congregação 7": "#D2691E", // Chocolate
  "Congregação 8": "#A0522D", // Sienna
  "Congregação 9": "#BDB76B", // Dark Khaki
  Outro: "#556B2F", // Dark Olive Green
}

const customDayNames = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"]

// Function to generate a color based on the event description
const getColorForDescription = (description: string) => {
  let hash = 0
  for (let i = 0; i < description.length; i++) {
    hash = description.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = (hash % 60) + 30 // Limit hue to 30-90 (yellow to orange range)
  return `hsl(${hue}, 70%, 80%)`
}

const adjustEventDates = (event: EventDetails) => {
  const adjustedEvent = { ...event }
  if (moment(event.end).diff(moment(event.start), "days") === 1) {
    adjustedEvent.end = moment(event.start).add(23, "hours").toDate()
  }
  return adjustedEvent
}

export function ChurchCalendar() {
  const { events, loading, error } = useGoogleCalendarEvents()
  const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null)
  const [view, setView] = useState("month")
  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set())

  useEffect(() => {
    moment.locale("pt-br")
  }, [])

  const locations = useMemo(() => {
    const uniqueLocations = new Set<string>()
    events.forEach((event) => {
      uniqueLocations.add(event.location || "Outro")
    })
    return Array.from(uniqueLocations)
  }, [events])

  const filteredEvents = useMemo(() => {
    if (selectedLocations.size === 0) return events
    return events.filter((event) => selectedLocations.has(event.location || "Outro"))
  }, [events, selectedLocations])

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[700px]">
        <p className="text-lg text-[#8B7355]">Carregando eventos...</p>
      </div>
    )

  if (error)
    return (
      <div className="flex items-center justify-center min-h-[700px]">
        <p className="text-lg text-red-700">Erro ao carregar eventos: {error.message}</p>
      </div>
    )

  const handleSelectEvent = (event: EventDetails) => {
    setSelectedEvent(adjustEventDates(event))
  }

  const eventStyleGetter = (event: EventDetails) => {
    const location = event.location || "Outro"
    const locationColor = locationColors[location] || locationColors["Outro"]
    const descriptionColor = event.description ? getColorForDescription(event.description) : locationColor

    return {
      style: {
        backgroundColor: descriptionColor,
        color: "#000000", // Always use black text for better readability
        borderRadius: "4px",
        border: `2px solid ${locationColor}`,
        fontSize: "14px",
        padding: "4px 8px",
        fontWeight: "bold", // Make text bold for better visibility
      },
    }
  }

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) => {
      const newLocations = new Set(prev)
      if (newLocations.has(location)) {
        newLocations.delete(location)
      } else {
        newLocations.add(location)
      }
      return newLocations
    })
  }

  const toggleAllLocations = () => {
    setSelectedLocations((prev) => (prev.size === locations.length ? new Set() : new Set(locations)))
  }

  const formats = {
    monthHeaderFormat: (date: Date) => {
      return moment(date).format("MMMM [de] YYYY").toUpperCase()
    },
    dayFormat: (date: Date) => {
      return customDayNames[date.getDay()]
    },
    dayHeaderFormat: (date: Date) => {
      return moment(date).format("dddd, D [de] MMMM").toLowerCase()
    },
    dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) => {
      return `${moment(start).format("D [de] MMMM")} - ${moment(end).format("D [de] MMMM")}`
    },
    eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) => {
      return `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`
    },
  }

  const handleAddToCalendar = () => {
    const calendarUrl = `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(
      "7fd2e1bde99570af9a77c8305b8dd5229b43df626856dc5ea4d1de84ff3b234c@group.calendar.google.com",
    )}`
    window.open(calendarUrl, "_blank")
  }

  return (
    <div className="calendar-container w-full max-w-[1400px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Wheat className="w-8 h-8 text-[#808000]" />
          <h2 className="text-[3rem] font-serif tracking-tight text-[#8B7355]">IEADESGA</h2>
          <Wheat className="w-8 h-8 text-[#808000]" />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-xl text-[#C4A484]">{moment().format("YYYY")}</p>
          <p className="text-2xl font-serif text-[#808000] mt-2">Ano da Colheita</p>
        </div>
      </div>

      <div className="mb-8 w-full bg-[#8B7355]/10 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif text-[#8B7355]">Palavra Pastoral</h2>
          <Link href="/palavra-pastoral">
            <Button variant="outline" className="bg-[#8B7355] text-white hover:bg-[#8B7355]/90">
              Ler Mensagem
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div className="xl:col-span-2 lg:col-span-2 bg-white/50 backdrop-blur-sm rounded-xl p-2 sm:p-4 lg:p-6 border border-[#C4A484]/20">
          <Calendar
            localizer={localizer}
            events={filteredEvents.map(adjustEventDates)}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700, width: "100%" }}
            views={["month", "week", "day"]}
            messages={messages}
            formats={formats}
            onSelectEvent={handleSelectEvent}
            eventPropGetter={eventStyleGetter}
            view={view as any}
            onView={(newView) => setView(newView)}
          />
        </div>

        <div className="space-y-6">
          <Button className="w-full bg-[#8B7355] hover:bg-[#8B7355]/90 text-white mb-4" onClick={handleAddToCalendar}>
            <CalendarIcon className="w-4 h-4 mr-2" />
            Adicionar ao Meu Calendário
          </Button>

          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-[#C4A484]/20">
            <h2 className="text-xl font-serif text-[#8B7355] mb-4">Localização</h2>
            <Button
              onClick={toggleAllLocations}
              variant="outline"
              className="w-full mb-4 bg-white hover:bg-[#8B7355]/10"
            >
              {selectedLocations.size === locations.length ? "Desmarcar Todos" : "Selecionar Todos"}
            </Button>
            <div className="space-y-3">
              {locations.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={location}
                    checked={selectedLocations.has(location)}
                    onCheckedChange={() => toggleLocation(location)}
                    className="border-[#C4A484]"
                  />
                  <label
                    htmlFor={location}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    style={{ color: locationColors[location] || locationColors["Outro"] }}
                  >
                    {location}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-md bg-[#FFFDD0]/90 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif text-[#8B7355]">{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="mt-4 max-h-[60vh]">
            <div className="space-y-4 p-4">
              <div>
                <p className="text-sm text-[#C4A484]">Início</p>
                <p className="text-lg text-[#8B7355]">{moment(selectedEvent?.start).format("DD/MM/YYYY HH:mm")}</p>
              </div>
              <div>
                <p className="text-sm text-[#C4A484]">Fim</p>
                <p className="text-lg text-[#8B7355]">{moment(selectedEvent?.end).format("DD/MM/YYYY HH:mm")}</p>
              </div>
              {selectedEvent?.description && (
                <div>
                  <p className="text-sm text-[#C4A484]">Descrição</p>
                  <p className="text-lg text-[#8B7355]">{selectedEvent.description}</p>
                </div>
              )}
              {selectedEvent?.location && (
                <div>
                  <p className="text-sm text-[#C4A484]">Local</p>
                  <p className="text-lg text-[#8B7355]">{selectedEvent.location}</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}

