import MenuIcon from '~icons/boxicons/menu';
import SettingsAdjustIcon from '~icons/carbon/settings-adjust';
import UploadIcon from '~icons/icomoon-free/upload';
import SearchIcon from '~icons/akar-icons/search';

interface HeaderProps {
  expandSidebar: boolean;
  onCloseSidebar: (expandSidebar: boolean) => void;
}

export default function Header({expandSidebar, onCloseSidebar}: HeaderProps) {
  return (
    <>
      <section className="w-full border-b-2 border-border flex p-3 gap-2 fixed bg-card">
        <div>
          <MenuIcon onClick={()=>onCloseSidebar(!expandSidebar)} style={{fontSize: "2rem", padding: "0.5rem", border: "solid 0.15rem var(--color-border)"}}/>
        </div>
        <form action="" className="w-full border-[0.15rem] border-border flex items-center px-2 bg-background focus-within:border-primary transition-colors">
          <SearchIcon style={{fontSize: "0.8rem"}}/>
          <input type="text" placeholder="Search by class, title, or topic..." className="indent-2 w-full box-border h-full text-md text-foreground focus:outline-none focus:border-lilac placeholder:text-mute-foreground"/>
        </form>
        <div>
          <SettingsAdjustIcon style={{fontSize: "2rem", padding: "0.5rem", border: "solid 0.15rem var(--color-border)"}}/>
        </div>
        <div>
          <UploadIcon style={{fontSize: "2rem", background: "#6f51a6", color: "fbf9f1", padding: "0.5rem"}}/>
        </div>
      </section>
    </>
  );
}