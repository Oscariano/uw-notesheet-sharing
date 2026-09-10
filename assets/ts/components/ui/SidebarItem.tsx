interface SidebarItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function SidebarItem({ label, isActive, onClick }: SidebarItemProps) {
  const base =
    'rounded-md px-3 py-2 text-left text-sm font-medium transition-colors';
  const state = isActive
    ? 'bg-indigo-500 text-white'
    : 'text-slate-600 hover:bg-slate-100';

  return (
    <button type="button" onClick={onClick} className={`${base} ${state}`}>
      {label}
    </button>
  );
}
