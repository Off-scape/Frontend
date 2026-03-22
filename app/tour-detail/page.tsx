import { notFound }         from 'next/navigation';
import { Metadata }         from 'next';
import { getTourById, mockDetailTour } from '@/data/Mocktours';
import { TourDetailClient } from '@/components/tour/Tourdetailclient';

interface PageProps {
  searchParams: { id?: string };
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  try {
    const tour  = await getTourById(searchParams.id ?? mockDetailTour.id);
    const title = tour.title ?? tour.activity;
    return {
      title: `${title} | Grounded`,
      description: tour.description ?? `${title} — ${tour.location}`,
      openGraph: { title, images: [{ url: tour.images?.[0] ?? tour.image }] },
    };
  } catch {
    return { title: 'Tur tapılmadı | Grounded' };
  }
}

export default async function TourDetailPage({ searchParams }: PageProps) {
  const id = searchParams.id ?? mockDetailTour.id;

  let tour;
  try {
    tour = await getTourById(id);
  } catch {
    notFound();
  }

  return (
    <TourDetailClient
      tour={tour}
      displayTitle={tour.title ?? tour.activity}
      galleryImages={tour.images?.length ? tour.images : [tour.image]}
      initialDateId={tour.dates?.find((d) => d.availableSpots > 0)?.id}
    />
  );
}