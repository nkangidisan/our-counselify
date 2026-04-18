import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ glass = true, hover = false, className = '', ...props }, ref) => {
    const baseClasses = glass ? 'surface-card' : 'bg-bg-surface border border-border-default rounded-lg';
    const hoverClasses = hover ? 'hover-lift' : '';
    const classes = `${baseClasses} ${hoverClasses} p-6 rounded-2xl ${className}`.trim();

    return <div ref={ref} className={classes} {...props} />;
  }
);
Card.displayName = 'Card';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', className = '', children, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-primary/10 text-primary border border-primary/25',
      success: 'bg-accent-mint/10 text-accent-mint border border-accent-mint/25',
      warning: 'bg-accent-amber/10 text-accent-amber border border-accent-amber/25',
      error: 'bg-accent-coral/10 text-accent-coral border border-accent-coral/25',
      info: 'bg-primary/10 text-primary border border-primary/25',
    };

    const sizeClasses = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1.5 text-sm',
      lg: 'px-4 py-2 text-base',
    };

    const classes = `inline-flex items-center rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

    return (
      <span ref={ref} className={classes} {...props}>
        {children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, className = '', disabled, ...props }, ref) => {
    const variantClasses = {
      primary: 'bg-primary text-black hover:bg-primary-hover shadow-lg shadow-[rgba(212,168,85,0.15)]',
      secondary: 'bg-bg-surface text-text-primary border border-border-default hover:border-primary/50 hover:bg-bg-elevated',
      ghost: 'border border-border-default bg-transparent text-text-primary hover:border-border-glow hover:bg-primary/10',
      outline: 'border border-border-glow text-primary hover:bg-primary/10',
      danger: 'bg-accent-coral text-white hover:bg-accent-coral/90',
    };

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const classes = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-150 focus-ring hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="w-4 h-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {props.children}
      </button>
    );
  }
);
Button.displayName = 'Button';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full rounded-lg border border-border-default bg-bg-surface px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${className}`.trim()}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`w-full resize-none rounded-lg border border-border-default bg-bg-surface px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${className}`.trim()}
        {...props}
      />
    );
  }
);
TextArea.displayName = 'TextArea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`w-full appearance-none rounded-lg border border-border-default bg-bg-surface px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${className}`.trim()}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = 'Select';
