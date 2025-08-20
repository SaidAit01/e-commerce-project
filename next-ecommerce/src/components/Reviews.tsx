// src/components/Reviews.tsx
import Image from "next/image";

type Review = {
  id: string;
  rating?: number;
  heading?: string;
  body?: string;
  customer?: { avatar_url?: string; display_name?: string };
  media?: { id: string; url: string }[];
};

async function getReviews(productId: string): Promise<Review[]> {
  // Ensure the public key exists
  if (!process.env.NEXT_PUBLIC_FERA_ID) {
    console.error("Missing NEXT_PUBLIC_FERA_ID");
    return [];
  }

  const url = `https://api.fera.ai/v3/public/reviews?product.id=${encodeURIComponent(
    productId
  )}&public_key=${process.env.NEXT_PUBLIC_FERA_ID}`;

  // Avoid caching stale/failed responses
  const res = await fetch(url, { cache: "no-store", next: { revalidate: 0 } });

  if (!res.ok) {
    console.error("Fera reviews fetch failed:", res.status, res.statusText);
    return [];
  }

  const json: any = await res.json();

  // Normalise to an array no matter what shape the API returns
  const list =
    (Array.isArray(json?.data) && json.data) ||
    (Array.isArray(json?.reviews) && json.reviews) ||
    (Array.isArray(json?.items) && json.items) ||
    (Array.isArray(json) && json) ||
    [];

  return list as Review[];
}

const Reviews = async ({ productId }: { productId: string }) => {
  const items = await getReviews(productId);

  if (!items.length) return <p>No reviews available.</p>;

  return (
    <div className="flex flex-col gap-6">
      {items.map((review) => (
        <div className="flex flex-col gap-4" key={review.id}>
          {/* USER */}
          <div className="flex items-center gap-4 font-medium">
            <Image
              src={review.customer?.avatar_url || "/default-avatar.png"}
              alt="User avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span>{review.customer?.display_name || "Anonymous"}</span>
          </div>

          {/* STARS */}
          <div className="flex gap-2">
            {Array.from({
              length: Math.max(0, Math.min(5, review.rating ?? 0)),
            }).map((_, i) => (
              <Image
                src="/star.png"
                alt="Star"
                key={i}
                width={16}
                height={16}
              />
            ))}
          </div>

          {/* TEXT */}
          {review.heading && <p className="font-semibold">{review.heading}</p>}
          {review.body && <p>{review.body}</p>}

          {/* MEDIA */}
          {!!review.media?.length && (
            <div className="flex gap-2 flex-wrap">
              {review.media!.map((m) => (
                <Image
                  src={m.url}
                  key={m.id}
                  alt="Review media"
                  width={100}
                  height={50}
                  className="object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Reviews;
