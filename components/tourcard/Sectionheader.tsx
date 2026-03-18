'use client';

import React from 'react';
import Link from 'next/link';

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onAction?: () => void;
  actionHref?: string; 
  isActionDisabled?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionText,
  onAction,
  actionHref,
  isActionDisabled = false,
}) => {
  
  const handleAction = () => {
    if (!isActionDisabled && onAction) {
      onAction();
    }
  };
  
  const actionClasses = `text-sm md:text-base font-medium transition-colors duration-200 ${
    isActionDisabled
      ? 'text-gray-400 cursor-not-allowed'
      : 'text-blue-600 hover:text-blue-700 cursor-pointer'
  }`;

  return (
    <div className="flex justify-between items-center mb-6 md:mb-8">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#142A12]">
        {title}
      </h2>

      {actionText && (
        <>
          
          {actionHref && !isActionDisabled ? (
            <Link href={actionHref} className="text-[#142A12]">
              {actionText}
              
            </Link>
          ) : (
            
            <button
              onClick={handleAction}
              disabled={isActionDisabled}
              className={actionClasses}
              title={isActionDisabled ? 'Tezliklə' : undefined}
            >
              {actionText}
              {!isActionDisabled && (
                <span className="ml-1 inline-block">→</span>
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SectionHeader;