
import React from 'react';

interface Props {
  year: string;
  title: string;
  description: string;
  isLast?: boolean;
}

const TimelineItem: React.FC<Props> = ({ year, title, description, isLast }) => {
  return (
    <div className="flex gap-10 group">
      <div className="flex flex-col items-center">
        <div className="w-5 h-5 border-2 border-black dark:border-white bg-[#fafafa] dark:bg-[#0a0a0a] rounded-full group-hover:scale-125 transition-transform z-10 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full"></div>
        </div>
        {!isLast && <div className="w-px h-full bg-black/10 dark:bg-white/10 my-1"></div>}
      </div>
      <div className="pb-16 space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-xs font-black uppercase tracking-[0.3em] px-3 py-1 bg-black text-white dark:bg-white dark:text-black">
            {year}
          </span>
          <div className="h-px flex-1 bg-black/5 dark:bg-white/5"></div>
        </div>
        <h3 className="text-2xl font-black serif uppercase italic tracking-tight group-hover:translate-x-2 transition-transform">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-base leading-loose max-w-xl">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TimelineItem;
