import React from 'react';

const MoedaDropdown = ({
    moedas,
    titulo = "",
    valorSelecionado,
    onChange
}) => {
    return (
        <>
            <div>
                <label
                    htmlFor={titulo}
                    className="block text-sm font-medium text-gray-700"
                >
                    {titulo}
                </label>
            </div>
            <div className="mt-1 relative">
                <select
                    id={titulo}
                    value={valorSelecionado}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {moedas.map(moeda => (
                        <option value={moeda} key={moeda}>{moeda}</option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default MoedaDropdown;
