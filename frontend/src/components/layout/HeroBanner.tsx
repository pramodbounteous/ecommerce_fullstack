import { Button } from "@/components/ui/button"

export default function HeroBanner() {

  return (

    <section className="max-w-7xl mx-auto px-6 py-10">

      <div className="bg-slate-800 text-white rounded-xl p-10 flex justify-between items-center">

        <div className="space-y-4">

          <h2 className="text-sm uppercase text-gray-300">
            Best deals online
          </h2>

          <h1 className="text-4xl font-bold">
            Smart Wearable
          </h1>

          <p className="text-gray-300">
            Up to 80% off
          </p>

          <Button className="bg-gradient-to-r from-purple-500 to-indigo-600">
            Shop Now
          </Button>

        </div>

      </div>

    </section>

  )
}