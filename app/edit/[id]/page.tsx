import EventForm from '@/components/events/EventForm';

export default function EditEventPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Event</h1>
      <EventForm isEditing />
    </div>
  );
}