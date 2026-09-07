/** Placeholder tiles shown while the portfolio is loading. */
export function WorkSkeleton({ count = 8 }: { count?: number }) {
  // A fixed ratio pattern keeps the masonry from jumping when real tiles land.
  const ratios = [1, 1, 0.8, 1, 0.56, 1, 1, 0.8];
  return (
    <div className="work-masonry" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="work-tile work-tile--skeleton" style={{ aspectRatio: `${ratios[i % ratios.length]}` }} />
      ))}
    </div>
  );
}
