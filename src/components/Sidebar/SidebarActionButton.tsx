interface SidebarActionProps {
  handleLogout: () => void;
}

const SidebarAction: React.FC<SidebarActionProps> = ({ handleLogout }) => {
  return (
    <button
      className="btn btn-outline-dark align-self-end mt-auto mb-4"
      type="button"
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
};

export default SidebarAction;
