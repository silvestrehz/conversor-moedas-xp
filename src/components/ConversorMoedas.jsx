import React, { useEffect, useState } from 'react';

const ConversorMoedas = ({ temaEscuro }) => {
    const [quantiaBRL, setQuantiaBRL] = useState(1);
    const [moedaSelecionada, setMoedaSelecionada] = useState('USD');
    const [resultado, setResultado] = useState(null);
    const [mensagemErro, setMensagemErro] = useState('');
    const [dataCotacao, setDataCotacao] = useState('');
    const [taxas, setTaxas] = useState({});
    const [moedasDisponiveis, setMoedasDisponiveis] = useState([]);

    const fetchTaxas = async () => {
        try {
            const res = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
            if (!res.ok) throw new Error('Erro ao buscar dados da API.');
            const data = await res.json();
            setTaxas(data.bpi);

            const moedas = Object.keys(data.bpi);
            setMoedasDisponiveis(moedas);
            setMensagemErro('');
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            setMensagemErro('Não foi possível carregar os dados da moeda.');
        }
    };

    const converterMoedas = () => {
        try {
            if (!taxas['USD'] || !taxas[moedaSelecionada]) {
                throw new Error('Taxa não disponível.');
            }

            const taxaBTCparaUSD = taxas['USD'].rate_float;
            const taxaBTCparaSelecionada = taxas[moedaSelecionada].rate_float;

            if (!taxaBTCparaSelecionada || !taxaBTCparaUSD) {
                throw new Error('Taxa não disponível para BRL ou moeda selecionada.');
            }

            // Convertendo BRL para USD e depois para a moeda selecionada
            const valorUSD = quantiaBRL * 0.17747; // R$1 BRL = 0.17747 USD
            const valorConvertido = (valorUSD / taxaBTCparaUSD) * taxaBTCparaSelecionada;

            setResultado(valorConvertido.toFixed(2));
            setMensagemErro('');
            setDataCotacao(new Date().toLocaleString()); // Data Cotação
        } catch (error) {
            console.error("Erro ao converter moedas:", error);
            setResultado(null);
            setMensagemErro('Não foi possível converter a moeda.');
        }
    };

    useEffect(() => {
        fetchTaxas();
    }, []);

    return (
        <div className={`max-w-md w-full p-6 ${temaEscuro ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-700'} rounded-lg shadow-lg border ${temaEscuro ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className="mb-6 text-2xl font-bold">
                Conversor de Moedas
            </h2>
            <div className="mb-4">
                <label htmlFor="quantia" className="block text-sm font-medium">Quantia em BRL:</label>
                <input
                    id="quantia"
                    type="number"
                    value={quantiaBRL}
                    onChange={(e) => setQuantiaBRL(parseFloat(e.target.value))}
                    step="0.01"
                    className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="moeda" className="block text-sm font-medium">Converter para:</label>
                <select
                    id="moeda"
                    value={moedaSelecionada}
                    onChange={(e) => setMoedaSelecionada(e.target.value)}
                    className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {moedasDisponiveis.map(moeda => (
                        <option key={moeda} value={moeda}>
                            {moeda} ({taxas[moeda]?.description || ''})
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex justify-end mb-6">
                <button
                    onClick={converterMoedas}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Converter
                </button>
            </div>
            {resultado !== null && (
                <div className="mb-4 text-lg font-semibold">
                    Quantia Convertida: {resultado} {moedaSelecionada}
                </div>
            )}
            {mensagemErro && (
                <div className="mb-4 text-lg font-semibold text-red-600">
                    {mensagemErro}
                </div>
            )}
            {dataCotacao && (
                <div className="text-sm text-gray-500">
                    Data & Hora da Cotação: {dataCotacao}
                </div>
            )}
        </div>
    );
};

export default ConversorMoedas;
