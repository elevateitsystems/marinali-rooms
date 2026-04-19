"use client";

import React from "react";

export function SettingsSkeleton() {
  return (
    <div className="flex h-full overflow-hidden bg-gray-50/50">
      {/* Left: Form Skeleton */}
      <div className="flex-1 h-full p-6 md:p-12 space-y-10 animate-pulse">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="h-10 w-64 bg-gray-200 rounded-lg"></div>
            <div className="h-4 w-96 bg-gray-200 rounded-md"></div>
          </div>
          <div className="h-12 w-80 bg-gray-200 rounded-xl"></div>
        </div>
        
        <div className="space-y-6">
          <div className="h-8 w-40 bg-gray-200 rounded-md"></div>
          <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-8">
            <div className="grid grid-cols-3 gap-6">
              <div className="aspect-square bg-gray-100 rounded-xl"></div>
              <div className="aspect-[16/9] bg-gray-100 rounded-xl col-span-2"></div>
            </div>
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-100 rounded-md"></div>
              <div className="h-4 w-5/6 bg-gray-100 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Preview Skeleton */}
      <div className="hidden lg:block w-[480px] xl:w-[560px] bg-white border-l border-gray-200 p-8 space-y-8 animate-pulse">
        <div className="h-12 w-full bg-gray-100 rounded-xl mb-12"></div>
        <div className="space-y-4">
          <div className="h-64 w-full bg-gray-50 rounded-2xl"></div>
          <div className="h-8 w-3/4 bg-gray-50 rounded-md"></div>
          <div className="h-20 w-full bg-gray-50 rounded-md"></div>
        </div>
        <div className="space-y-3 pt-12">
          <div className="h-4 w-1/4 bg-gray-50 rounded-md"></div>
          <div className="h-4 w-1/2 bg-gray-50 rounded-md"></div>
          <div className="h-4 w-1/3 bg-gray-50 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
