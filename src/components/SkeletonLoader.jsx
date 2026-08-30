import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="space-y-6 animate-pulse p-2">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-2">
          <div className="h-7 w-64 rounded-md skeleton-shimmer" />
          <div className="h-4 w-96 rounded-md skeleton-shimmer opacity-80" />
        </div>
        <div className="h-9 w-32 rounded-lg skeleton-shimmer" />
      </div>

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-4 w-28 rounded skeleton-shimmer" />
              <div className="w-8 h-8 rounded-md skeleton-shimmer" />
            </div>
            <div className="h-8 w-20 rounded skeleton-shimmer" />
            <div className="h-3 w-36 rounded skeleton-shimmer opacity-75" />
          </div>
        ))}
      </div>

      {/* Main Content Area Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 min-h-[360px]">
          <div className="h-6 w-48 rounded skeleton-shimmer" />
          <div className="h-64 w-full rounded-lg skeleton-shimmer" />
        </div>
        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 min-h-[360px]">
          <div className="h-6 w-36 rounded skeleton-shimmer" />
          <div className="space-y-3">
            {[1, 2, 3].map((j) => (
              <div key={j} className="h-20 w-full rounded-lg skeleton-shimmer" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
