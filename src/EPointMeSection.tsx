import * as React from 'react';

export interface EPointMeSectionProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export const EPointMeSection: React.FC<EPointMeSectionProps> = ({
  title,
  description,
  children,
  className = '',
}) => {
  // Try to use ShadCN Card if available, else fallback to div
  const Card = (props: React.HTMLAttributes<HTMLElement>) => (
    <div
      {...props}
      className={`bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800 ${props.className || ''}`}
    />
  );

  return (
    <section
      className={`w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 ${className}`}
      aria-label={title}
    >
      <div className="max-w-4xl mx-auto">
        <Card className="flex flex-col gap-4 p-6 sm:p-8 lg:p-10">
          <header className="mb-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-1 text-zinc-900 dark:text-zinc-100">{title}</h2>
            {description && (
              <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-300">{description}</p>
            )}
          </header>
          <article className="flex flex-col gap-4 md:gap-6 lg:gap-8">
            {children}
          </article>
        </Card>
      </div>
    </section>
  );
};