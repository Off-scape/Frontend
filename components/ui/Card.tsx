import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  elevated?: boolean;
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  elevated = false,
}) => {
  return (
    <div
      className={[
        'bg-white rounded-2xl border border-gray-100',
        elevated ? 'shadow-xl' : 'shadow-sm',
        paddingStyles[padding],
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
};