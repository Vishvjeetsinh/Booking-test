import { BookingForm } from "@/components/Booking/booking-form";

export default function BookingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 px-4">
      <h2 className="text-3xl font-bold text-center">Book Your Appointment</h2>
      <BookingForm />
    </div>
  );
}
