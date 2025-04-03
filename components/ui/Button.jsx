"use client";

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = forwardRef(({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md',
  isLoading = false,
  disabled = false,
  ...props 
}, ref) => {
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600',
    secondary: 'bg-secondary-200 text-slate-900 hover:bg-secondary-300 dark:bg-secondary-800 dark:text-white dark:hover:bg-secondary-700',
    outline: 'border border-secondary-300 bg-transparent text-slate-900 hover:bg-secondary-100 dark:border-secondary-700 dark:text-white dark:hover:bg-secondary-800',
    ghost: 'bg-transparent text-slate-900 hover:bg-secondary-100 dark:text-white dark:hover:bg-secondary-800',
    danger: 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-5 py-2.5 text-lg',
  };

  const buttonClasses = twMerge(
    clsx(
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-secondary-900 disabled:opacity-50 disabled:pointer-events-none',
      variants[variant],
      sizes[size],
      className
    )
  );

  return (
    <motion.button
      ref={ref}
      className={buttonClasses}
      disabled={disabled || isLoading}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em]" />
      ) : null}
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export { Button };