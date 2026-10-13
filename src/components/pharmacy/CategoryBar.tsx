"use client";

import React from "react";
import {
  ShieldAlert,
  Pill,
  Activity,
  Sparkles,
  Wind,
  Compass,
  LayoutGrid,
} from "lucide-react";
import { CATEGORIES } from "@/data/medicines";

interface CategoryBarProps {
  selectedCategory: string | null;
  onSelectCategory: (cat: string | null) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  ShieldAlert: <ShieldAlert className="w-4 h-4" />,
  Pill: <Pill className="w-4 h-4" />,
  Activity: <Activity className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Wind: <Wind className="w-4 h-4" />,
  Compass: <Compass className="w-4 h-4" />,
};

export function CategoryBar({
  selectedCategory,
  onSelectCategory,
}: CategoryBarProps) {
  return (
    <div className="w-full overflow-x-auto py-2 no-scrollbar">
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-max pb-1">
        <button
          onClick={() => onSelectCategory(null)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border cursor-pointer active:scale-95 ${
            selectedCategory === null
              ? "bg-[#084236] text-white border-[#084236] shadow-sm"
              : "bg-white text-slate-700 hover:bg-[#EAF3EE] hover:text-[#084236] border-slate-200/80 shadow-2xs"
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>All Medicines</span>
        </button>

        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category.name;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(isSelected ? null : category.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border cursor-pointer active:scale-95 ${
                isSelected
                  ? "bg-[#084236] text-white border-[#084236] shadow-sm"
                  : "bg-white text-slate-700 hover:bg-[#EAF3EE] hover:text-[#084236] border-slate-200/80 shadow-2xs"
              }`}
            >
              <span className={isSelected ? "text-[#10B981]" : "text-[#059669]"}>
                {ICON_MAP[category.icon] || <Pill className="w-3.5 h-3.5" />}
              </span>
              <span>{category.name}</span>
              {category.itemCount && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-white/20 text-[#EAF3EE]"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {category.itemCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
