/** Placeholder tiles shown while the portfolio is loading. */
export function WorkSkeleton({ count = 8, columns = 4 }: { count?: number; columns?: number }) {
  // A fixed ratio pattern keeps the masonry from jumping when real tiles land.
  const ratios = [1, 1, 0.8, 1, 0.56, 1, 1, 0.8];
  // The gallery is a flex row of columns (see .work-masonry), so the skeleton
  // has to be shaped the same way or its tiles line up in a single row.
  const cols: number[][] = Array.from({ length: columns }, () => []);
  for (let i = 0; i < count; i++) cols[i % columns].push(i);
  return (
    <div className="work-masonry" aria-hidden="true">
      {cols.map((col, c) => (
        <div className="work-masonry__col" key={c}>
          {col.map((i) => (
            <div
              key={i}
              className="work-tile work-tile--skeleton"
              style={{ aspectRatio: `${ratios[i % ratios.length]}` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
