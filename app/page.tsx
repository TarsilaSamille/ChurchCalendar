import { ChurchCalendar } from "../components/ChurchCalendar"
import "../styles/ChurchCalendar.css"

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <ChurchCalendar />
    </main>
  )
}

