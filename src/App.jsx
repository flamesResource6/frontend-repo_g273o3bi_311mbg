import { useState } from 'react'
import Spline from '@splinetool/react-spline'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [form, setForm] = useState({ name: '', email: '', mission: '', message: '', consent: true })
  const [status, setStatus] = useState({ loading: false, success: null, error: null })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: null, error: null })
    try {
      const res = await fetch(`${API_BASE}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to join waitlist')
      setStatus({ loading: false, success: 'You\'re on the list! We\'ll be in touch soon.', error: null })
      setForm({ name: '', email: '', mission: '', message: '', consent: true })
    } catch (err) {
      setStatus({ loading: false, success: null, error: err.message || 'Something went wrong' })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero with Spline cover */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/er66D6jbuo0hIjmn/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        {/* Gradient overlay for readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Cosmos Voyages
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Pioneering luxury expeditions across the cosmic frontier. Be among the first to experience orbit retreats, lunar flybys, and beyond.
          </p>
          <a href="#waitlist" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-6 py-3 text-white hover:bg-white/20 transition">
            Join the Waitlist
          </a>
        </div>
      </section>

      {/* Highlights */}
      <section className="px-6 py-16 max-w-6xl mx-auto grid sm:grid-cols-3 gap-6">
        {[
          { title: 'Orbital Retreats', desc: 'Multi-day stays aboard next-gen stations with panoramic Earth views.' },
          { title: 'Lunar Flybys', desc: 'Witness the Moon up close on curated, once-in-a-lifetime journeys.' },
          { title: 'Zero-G Suites', desc: 'Private cabins engineered for comfort in microgravity.' },
        ].map((f, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="mt-2 text-white/70">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Waitlist form */}
      <section id="waitlist" className="px-6 py-16 max-w-2xl mx-auto">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur">
          <h2 className="text-3xl font-bold">Join the waitlist</h2>
          <p className="mt-2 text-white/70">Secure your place among the first civilians to journey beyond Earth.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/80">Full name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-md bg-white/10 border border-white/10 px-3 py-2 outline-none placeholder-white/40 focus:border-white/30"
                  placeholder="Ada Lovelace"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-md bg-white/10 border border-white/10 px-3 py-2 outline-none placeholder-white/40 focus:border-white/30"
                  placeholder="you@domain.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/80">Mission interest</label>
              <select
                name="mission"
                value={form.mission}
                onChange={handleChange}
                className="mt-1 w-full rounded-md bg-white/10 border border-white/10 px-3 py-2 outline-none focus:border-white/30"
              >
                <option value="">Select a mission</option>
                <option>Orbital Retreat</option>
                <option>Lunar Flyby</option>
                <option>Suborbital Sampler</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-white/80">Message (optional)</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us what excites you most about space travel..."
                className="mt-1 w-full rounded-md bg-white/10 border border-white/10 px-3 py-2 outline-none placeholder-white/40 focus:border-white/30"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-white/80">
              <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} className="accent-purple-500" />
              I agree to be contacted about missions and availability.
            </label>

            <button
              type="submit"
              disabled={status.loading}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-purple-500 hover:bg-purple-600 disabled:opacity-60 px-4 py-2 font-medium transition"
            >
              {status.loading ? 'Submitting...' : 'Join waitlist'}
            </button>

            {status.success && <p className="text-green-400 mt-2">{status.success}</p>}
            {status.error && <p className="text-red-400 mt-2">{status.error}</p>}
          </form>
        </div>

        <p className="mt-8 text-center text-xs text-white/50">© {new Date().getFullYear()} Cosmos Voyages. All rights reserved.</p>
      </section>
    </div>
  )
}

export default App
