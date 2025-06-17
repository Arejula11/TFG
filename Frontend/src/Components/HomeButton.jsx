import { useNavigate } from 'react-router-dom';

export const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="fixed top-6 left-6 text-white font-bold p-2 rounded-full  opacity-90 hover:opacity-100 transition"
      onClick={() => navigate("/")}
      aria-label="Ir a inicio"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="#F87A01"
        className="icon icon-tabler icons-tabler-filled icon-tabler-home"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12.707 2.293l9 9c.63 .63 .184 1.707 -.707 1.707h-1v6a3 3 0 0 1 -3 3h-1v-7a3 3 0 0 0 -2.824 -2.995l-.176 -.005h-2a3 3 0 0 0 -3 3v7h-1a3 3 0 0 1 -3 -3v-6h-1c-.89 0 -1.337 -1.077 -.707 -1.707l9 -9a1 1 0 0 1 1.414 0m.293 11.707a1 1 0 0 1 1 1v7h-4v-7a1 1 0 0 1 .883 -.993l.117 -.007z" />
      </svg>
    </button>
  );
};