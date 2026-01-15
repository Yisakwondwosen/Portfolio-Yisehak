
import React from 'react';

interface Props {
  title: string;
}

const SectionHeader: React.FC<Props> = ({ title }) => {
  return (
    <div className="relative mb-12">
      <div className="flex items-center gap-4 mb-2">
        <div className="h-[1px] w-8 bg-black dark:bg-white opacity-20"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Section Dispatch</span>
      </div>
      <h2 className="text-4xl font-black serif uppercase italic tracking-tighter leading-none">{title}</h2>
    </div>
  );
};

export default SectionHeader;
