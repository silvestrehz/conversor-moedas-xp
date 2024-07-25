import { useState } from 'react';
import ConversorMoedas from './components/ConversorMoedas.jsx';
import ilustracao from './assets/xp.png';
import { FaSun, FaMoon } from 'react-icons/fa';

function App() {
  const [temaEscuro, setTemaEscuro] = useState(false);

  const toggleTema = () => {
    setTemaEscuro(prev => !prev);
    document.documentElement.classList.toggle('dark', !temaEscuro);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${temaEscuro ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-4 gap-4">
        <div className="flex-1 flex items-center justify-center">
          <img src={ilustracao} alt="XP" className="max-w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <ConversorMoedas temaEscuro={temaEscuro} />
        </div>
      </div>
      <button
        onClick={toggleTema}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        aria-label="Alternar tema"
      >
        {temaEscuro ? (
          <FaSun className="text-yellow-500 w-6 h-6" />
        ) : (
          <FaMoon className="text-gray-800 w-6 h-6" />
        )}
      </button>
    </div>
  );
}

export default App;
