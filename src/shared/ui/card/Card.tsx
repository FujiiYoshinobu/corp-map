import clsx from 'clsx';
import type { PropsWithChildren, ReactNode } from 'react';

interface CardProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  headerActions?: ReactNode;
  className?: string;
}

export const Card = ({
  title,
  subtitle,
  headerActions,
  className,
  children
}: PropsWithChildren<CardProps>) => (
  <section className={clsx('rounded-2xl bg-surface/80 p-6 shadow-lg shadow-black/30', className)}>
    {(title || subtitle || headerActions) && (
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          {title && <h2 className="text-lg font-semibold text-slate-100">{title}</h2>}
          {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
        </div>
        {headerActions}
      </header>
    )}
    <div>{children}</div>
  </section>
);
