'use client'

import { useState } from 'react'
import { Calendar, Clock, User, Mail, Phone, Video, X } from 'lucide-react'

interface TimeSlot {
  id: number
  time: string
  available: boolean
}

interface BookingForm {
  name: string
  email: string
  phone: string
  meetingType: 'video' | 'phone'
  date: string
  time: string
  notes: string
}

const timeSlots: TimeSlot[] = [
  { id: 1, time: '09:00 AM', available: true },
  { id: 2, time: '10:00 AM', available: true },
  { id: 3, time: '11:00 AM', available: false },
  { id: 4, time: '12:00 PM', available: true },
  { id: 5, time: '01:00 PM', available: true },
  { id: 6, time: '02:00 PM', available: true },
  { id: 7, time: '03:00 PM', available: false },
  { id: 8, time: '04:00 PM', available: true },
  { id: 9, time: '05:00 PM', available: true },
]

const meetingTypes = [
  { id: 'video', label: 'Video Call', icon: Video, description: 'Google Meet or Zoom' },
  { id: 'phone', label: 'Phone Call', icon: Phone, description: 'Audio only' },
]

export default function BookingCalendar() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState<BookingForm>({
    name: '',
    email: '',
    phone: '',
    meetingType: 'video',
    date: '',
    time: '',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Generate next 7 days for calendar
  const generateDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue
      
      dates.push({
        date: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        available: true
      })
    }
    
    return dates
  }

  const dates = generateDates()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setFormData(prev => ({ ...prev, date }))
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setFormData(prev => ({ ...prev, time }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log('Booking submitted:', formData)
    
    // Here you would typically send to your backend
    // await fetch('/api/bookings', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // })

    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setIsOpen(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        meetingType: 'video',
        date: '',
        time: '',
        notes: '',
      })
      setSelectedDate('')
      setSelectedTime('')
    }, 3000)
  }

  const handleMeetingTypeSelect = (type: 'video' | 'phone') => {
    setFormData(prev => ({ ...prev, meetingType: type }))
  }

  return (
    <>
      {/* Booking Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 z-40 flex items-center gap-2"
      >
        <Calendar className="h-5 w-5" />
        Book Consultation
      </button>

      {/* Booking Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Schedule Free Consultation</h2>
                  <p className="text-blue-100">30-minute consultation with our design experts</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="text-green-600 text-4xl">✓</div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for scheduling a consultation. We've sent a confirmation email to {formData.email}.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-6 text-left max-w-md mx-auto">
                    <div className="font-bold text-gray-900 mb-2">Booking Details:</div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>📅 {selectedDate} at {selectedTime}</div>
                      <div>📞 {formData.meetingType === 'video' ? 'Video Call' : 'Phone Call'}</div>
                      <div>👤 {formData.name}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Step 1: Meeting Type */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Video className="h-5 w-5" />
                      Meeting Type
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {meetingTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => handleMeetingTypeSelect(type.id as 'video' | 'phone')}
                          className={`p-4 border-2 rounded-xl text-left transition-all duration-200 ${
                            formData.meetingType === type.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <type.icon className="h-6 w-6 text-gray-700 mb-2" />
                          <div className="font-bold text-gray-900">{type.label}</div>
                          <div className="text-sm text-gray-600">{type.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Date Selection */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Select Date
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {dates.map((date) => (
                        <button
                          key={date.date}
                          type="button"
                          onClick={() => handleDateSelect(date.date)}
                          className={`p-3 border rounded-lg text-center transition-all duration-200 ${
                            selectedDate === date.date
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300'
                          } ${!date.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={!date.available}
                        >
                          <div className="font-bold">{date.display.split(' ')[1]}</div>
                          <div className="text-sm">{date.display.split(' ')[0]}</div>
                          <div className="text-xs text-gray-500">{date.display.split(' ')[2]}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Time Selection */}
                  {selectedDate && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Select Time
                      </h3>
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => handleTimeSelect(slot.time)}
                            className={`p-3 border rounded-lg text-center transition-all duration-200 ${
                              selectedTime === slot.time
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-gray-300'
                            } ${!slot.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!slot.available}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Contact Information */}
                  {(selectedDate && selectedTime) && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Your Information
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="John Smith"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="john@example.com"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Meeting Type
                          </label>
                          <div className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                            {formData.meetingType === 'video' ? 'Video Call' : 'Phone Call'}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Project Details (Optional)
                        </label>
                        <textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tell us about your project, goals, and any specific requirements..."
                        />
                      </div>
                      
                      {/* Submit Button */}
                      <div className="pt-6 border-t border-gray-200">
                        <button
                          type="submit"
                          disabled={isSubmitting || !formData.name || !formData.email || !selectedDate || !selectedTime}
                          className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? 'Scheduling...' : 'Confirm Booking'}
                        </button>
                        <p className="text-sm text-gray-500 text-center mt-3">
                          You'll receive a confirmation email with meeting details.
                        </p>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}