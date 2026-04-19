import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ glass = true, hover = false, className = '', ...props }, ref) => {
  const baseClasses = glass ? 'surface-card' : 'rounded-3xl border border-border-default bg-bg-surface shadow-sm';
  const hoverClasses = hover ? 'hover:bg-bg-hover hover:shadow-md' : '';
  const classes = `${baseClasses} ${hoverClasses} p-5 sm:p-6 ${className}`.trim();

  return <div ref={ref} className={classes} {...props} />;
});
Card.displayName = 'Card';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ variant = 'default', size = 'md', className = '', children, ...props }, ref) => {
  const variantClasses = {
    default: 'border border-border-gold bg-primary/10 text-primary',
    success: 'border border-accent-green/20 bg-[var(--accent-green-subtle)] text-accent-green',
    warning: 'border border-accent-amber/20 bg-[var(--accent-amber-subtle)] text-accent-amber',
    error: 'border border-accent-red/20 bg-[var(--accent-red-subtle)] text-accent-red',
    info: 'border border-border-default bg-bg-elevated text-text-secondary',
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-[11px]',
    md: 'px-3 py-1.5 text-xs',
    lg: 'px-4 py-2 text-sm',
  };

  return (
    <span ref={ref} className={`inline-flex items-center rounded-full font-semibold uppercase tracking-[0.08em] ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
});
Badge.displayName = 'Badge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, className = '', disabled, ...props }, ref) => {
    const variantClasses = {
      primary: 'bg-primary text-white hover:bg-primary-hover shadow-sm',
      secondary: 'border border-border-default bg-bg-surface text-text-primary hover:bg-bg-hover shadow-sm',
      ghost: 'border border-border-default bg-transparent text-text-primary hover:bg-bg-hover',
      outline: 'border border-border-gold bg-transparent text-primary hover:bg-primary/10',
      danger: 'bg-accent-red text-white hover:opacity-90 shadow-sm',
    };

    const sizeClasses = {
      sm: 'min-h-[44px] px-4 text-sm',
      md: 'min-h-12 px-5 text-base',
      lg: 'min-h-[52px] px-6 text-base',
    };

    return (
      <button
        ref={ref}
        className={`interactive-target inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : null}
        {props.children}
      </button>
    );
  }
);
Button.displayName = 'Button';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`min-h-12 w-full rounded-2xl border border-border-default bg-bg-surface px-4 text-[16px] text-text-primary placeholder:text-text-muted shadow-sm outline-none focus:border-border-gold focus:ring-0 focus:shadow-gold ${className}`.trim()}
      {...props}
    />
  );
});
Input.displayName = 'Input';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className = '', ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`min-h-[120px] w-full rounded-2xl border border-border-default bg-bg-surface px-4 py-3 text-[16px] text-text-primary placeholder:text-text-muted shadow-sm outline-none focus:border-border-gold focus:ring-0 focus:shadow-gold ${className}`.trim()}
      {...props}
    />
  );
});
TextArea.displayName = 'TextArea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className = '', children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={`min-h-12 w-full appearance-none rounded-2xl border border-border-default bg-bg-surface px-4 text-[16px] text-text-primary shadow-sm outline-none focus:border-border-gold focus:ring-0 focus:shadow-gold ${className}`.trim()}
      {...props}
    >
      {children}
    </select>
  );
});
Select.displayName = 'Select';
