const Sidebar = () => {
    return (
      <aside className="w-64 bg-base-100 border-r border-base-300 p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-4">Collections</h2>
        <ul className="menu">
          <li><a className="rounded-btn">New Request</a></li>
          <li><a className="rounded-btn">Saved Requests</a></li>
        </ul>
      </aside>
    );
  };
  
  export default Sidebar;
  