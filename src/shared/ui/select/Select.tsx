import clsx from 'clsx';
import type { ChangeEvent } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
}

export const Select = ({ label, options, value, onChange }: SelectProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <label className="flex w-full flex-col gap-2 text-sm text-slate-300">
      <span>{label}</span>
      <select
        value={value}
        onChange={handleChange}
        className={clsx(
          'w-full rounded-xl border border-outline/60 bg-transparent px-3 py-2 text-slate-100 shadow-inner shadow-black/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/60'
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-surface text-slate-900">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};
