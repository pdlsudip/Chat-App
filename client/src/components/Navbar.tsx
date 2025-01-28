import { useLogout } from "../customHooks/useLogout";
const Navbar = () => {
  const { logout, isLoading } = useLogout();

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <h1 className="text-white text-lg font-bold">MyApp</h1>
      <button
        onClick={() => logout()}
        disabled={isLoading}
        className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100"
      >
        {isLoading ? "Logging out..." : "Logout"}
      </button>
    </nav>
  );
};

export default Navbar;
