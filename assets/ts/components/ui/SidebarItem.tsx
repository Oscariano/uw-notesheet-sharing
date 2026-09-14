interface SidebarItemProps {
  label: string;
  isActive: boolean;
  Icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement> & {
    title?: string;
  }>;
  onClick: () => void;
}

export default function SidebarItem({ label, isActive, Icon, onClick }: SidebarItemProps) {
  const base =
    'px-3 py-2 text-left transition-colors w-full flex gap-2 items-center text-md ';
  const state = isActive
    ? 'bg-[#fbf9f1] text-[#3b362f] border-l-4 border-[#6f51a6]'
    : 'text-[#8a8072] hover:bg-slate-100';
  const iconColor = isActive
    ? '#6f51a6'
    : '#8a8072';

  return (
    <div className={`${base} ${state}`}>
      <Icon style={{color: iconColor}}/>
      <button type="button" onClick={onClick}>
        {label}
      </button>
    </div>
  );
}
