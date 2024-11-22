'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  image: string;
}

export default function EventDetails({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event | null>(null);
  const router = useRouter();

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const foundEvent = events.find((e: Event) => e.id === params.id);
    if (foundEvent) {
      console.log("foundEvent => ", foundEvent);
      setEvent(foundEvent);
    } else {
      router.push('/');
    }
  }, [params.id, router]);

  const handleDelete = () => {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const updatedEvents = events.filter((e: Event) => e.id !== params.id);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    router.push('/');
  };

  if (!event) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-card rounded-lg overflow-hidden shadow-lg">
        <div className="relative h-96">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8">
          <div className="flex justify-between items-start">
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
            <div className="space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push(`/edit/${params.id}`)}
              >
                Edit Event
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Event</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the
                      event.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="flex items-center space-x-6 mb-6 text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{event.venue}</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed">{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}