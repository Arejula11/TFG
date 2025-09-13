import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewViaContext } from '../Context/NewViaContext';

export const ButtonMedico = () => {
  const navigate = useNavigate();
  const { clearNewVia } = useContext(NewViaContext);
  const handleButtonClick = () => {
    clearNewVia();
    navigate('/');
  };

  return (
    <button
      className="fixed top-6 left-6 text-white font-bold p-2 rounded-full  opacity-90 hover:opacity-100 transition"
      onClick={handleButtonClick}
      aria-label="Ir a vista principal"
      type="button"
    > 
      <div className="flex flex-col items-center bg-orangeSalud p-2 rounded-full">
        <p>Ir a vista principal</p>
      </div>
    </button>
  );
};