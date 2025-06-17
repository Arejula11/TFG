import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { graphviz } from 'd3-graphviz';
import { HomeButtonAdmin } from '../Components/HomeButtonAdmin';
import { NewViaContext } from '../Context/NewViaContext';






export const AdminGraph = () => {
  const containerRef = useRef(null);
  const {newVia, clearNewVia, changeName} = useContext(NewViaContext);
  const digraph = newVia.graph; 
  const navigate = useNavigate();
  

  
  // Utilidad para formatear nombres de nodos
  function formatNodeLabel(label, maxLength = 25) {
    // Reemplaza _ por espacio
    let formatted = label.replace(/_/g, ' ');
    // Si es muy largo, añade saltos de línea cada maxLength caracteres
    if (formatted.length > maxLength) {
      const regex = new RegExp(`(.{1,${maxLength}})(\\s|$)`, 'g');
      formatted = formatted.match(regex).join('\\n');
    }
    return formatted;
  }

  // Preprocesa el DOT para mejorar la visualización
  function prettifyDot(dot) {
    // Solo procesa líneas que definen nodos o edges
    return dot.split('\n').map(line => {
      // Si es una línea de atributo global, no tocar
      if (
        line.trim().startsWith('digraph') ||
        line.trim().startsWith('rankdir') ||
        line.trim().startsWith('edge') ||
        line.trim().startsWith('node') ||
        line.trim() === '{' ||
        line.trim() === '}'
      ) return line;

      // Reemplaza nombres de nodos y nodos en edges
      return line.replace(/("[^"]+"|[a-zA-Z0-9_]+)/g, (match) => {
        // Si es un atributo (label=, penwidth=, etc), no tocar
        if (/=$/.test(match) || /^[0-9.]+$/.test(match)) return match;
        // Si es un número, no tocar
        if (!isNaN(match)) return match;
        // Si ya está entre comillas, quitar comillas para formatear y volver a poner
        let clean = match.replace(/^"|"$/g, '');
        return `"${formatNodeLabel(clean)}"`;
      });
    }).join('\n');
  }

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !digraph) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Prettify el DOT antes de renderizar
    const prettyDot = prettifyDot(digraph);

    graphviz(container)
      .zoom(true)
      .zoomScaleExtent([0.5, 3])
      .width(width)
      .height(height)
      .renderDot(prettyDot);
  }, [digraph]);

  const handleAtrás = () => {
    const name = newVia.nombre;
    clearNewVia();
    changeName(name);
    navigate("/admin/newViaClinica/datos")
  }

  return (
    
    <div className="w-full h-full flex flex-col items-center align-middle justify-center">
       <HomeButtonAdmin />
       <h2 className="text-blueGreen text-7xl font-semibold mb-6 mt-2">Grafo de la Nueva Vía Clínica</h2>
        <div
          ref={containerRef}
          className="w-[80%] h-[70%] border-4 border-blueGreen m-auto mt-10 rounded-lg shadow-lg"
        />
       <div className="flex justify-between gap-20 mb-10">
          <button
            type="button"
            onClick={() =>{handleAtrás()}}
            className="bg-orangeSalud w-[200px] text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-opacity duration-200 hover:opacity-100 opacity-90 focus:outline-none focus:ring-2 focus:ring-orangeSalud focus:ring-offset-2"
          >
            Atrás
          </button>
          
          <button
            type="button"
            onClick={() => navigate("/admin/newViaClinica/asignar")}
            className="bg-orangeSalud w-[200px] text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-opacity duration-200 hover:opacity-100 opacity-90 focus:outline-none focus:ring-2 focus:ring-orangeSalud focus:ring-offset-2"
          >
            Siguiente
          </button>
        </div>
    </div>
  );
};