import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewViaContext } from '../Context/NewViaContext';

export const ButtonAdmin = () => {
  const navigate = useNavigate();
  const { clearNewVia } = useContext(NewViaContext);
  const handleButtonClick = () => {
    clearNewVia();
    navigate('/adminHome');
  };

  return (
    <button
      className="fixed top-6 left-6 text-white font-bold p-2 rounded-full  opacity-90 hover:opacity-100 transition"
      onClick={handleButtonClick}
      aria-label="Ir a menu administrador"
      type="button"
    >
      <div className="flex flex-col items-center bg-orangeSalud p-2 rounded-full">
        <p>Ir a menu administrador</p>
      </div>
    </button>
  );
};