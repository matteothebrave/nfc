export type PlaceResult = {
  placeId: string;
  name: string;
  address: string;
};

export function reviewLinkFromPlaceId(placeId: string): string {
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
}
