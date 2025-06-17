import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ViaContext } from '../Context/ViaContext';

export const NavBar = ({ id }) => {
  const { via } = useContext(ViaContext);

  // Early return if `via` is not ready
  if (!via) return null;

  // Define what makes a task complete
  const isTaskComplete = (task) =>
    typeof task.estado === 'boolean' ? true : task.estado !== undefined && task.estado !== null;

  const isComplete = (section) =>
    Array.isArray(section) && section.every(isTaskComplete);

  const conditionPlanificacion = isComplete(via.planificacion);
  const conditionIngreso = isComplete(via.ingreso);
  const conditionQuirofano = isComplete(via.quirofano);
  const conditionPostCirugia = isComplete(via.postCirugia);
  const conditionPrimerDia = isComplete(via.primerDia);
  const conditionSegundoDia = isComplete(via.segundoDia);

  const links = [
    { to: `/paciente/planificacion/${id}`, label: 'Planificación', condition: true },
    { to: `/paciente/ingreso/${id}`, label: 'Ingreso', condition: conditionPlanificacion },
    { to: `/paciente/quirofano/${id}`, label: 'Quirófano', condition: conditionPlanificacion && conditionIngreso },
    { to: `/paciente/postcirugia/${id}`, label: 'Post Cirugía', condition: conditionPlanificacion && conditionIngreso && conditionQuirofano },
    { to: `/paciente/primerdia/${id}`, label: 'Primer Día', condition: conditionPlanificacion && conditionIngreso && conditionQuirofano && conditionPostCirugia },
    { to: `/paciente/segundodia/${id}`, label: 'Segundo Día', condition: conditionPlanificacion && conditionIngreso && conditionQuirofano && conditionPostCirugia && conditionPrimerDia },
    { to: `/paciente/postoperatorio/${id}`, label: 'Post Operatorio', condition: conditionPlanificacion && conditionIngreso && conditionQuirofano && conditionPostCirugia && conditionPrimerDia && conditionSegundoDia },
  ];

  return (
    <nav className="border-b-2 p-2 px-10 mt-10 mb-5">
      <div className="flex flex-wrap items-center justify-center">
        <div className="flex space-x-4">
          {links.map(link =>
            link.condition ? (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 text-xl font-semibold transition ${
                    isActive ? 'text-orangeSalud font-extrabold' : 'hover:underline'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ) : (
              <h1 key={link.to} className="px-3 py-2 text-xl font-semibold text-red-500">
                {link.label}
              </h1>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  id: PropTypes.string.isRequired,
};
