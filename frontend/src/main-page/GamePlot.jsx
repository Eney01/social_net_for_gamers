import React from 'react';
import './index.css';

const GamePlot = () => {
  
  return (
    <div className="max-w-4xl mx-auto text-white">
      <h2 className="text-2xl font-semibold mb-4">Чи справді Артур Морган заслужив свій кінець?</h2>
      <p className="text-gray-300 mb-4">
        Смерть Артура Моргана залишила шрам у серцях гравців. Але чи був його фінал єдиним можливим?
        І чи справді він "викупив" свої гріхи? У цій статті розглядаємо моральні аспекти та альтернативні варіанти розвитку подій.
      </p>
      <a
        href="https://gamedev.dou.ua/forums/topic/44316/"
        className="inline-block px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition"
      >
        Читати повністю
      </a>
    </div>
  );
};

export default GamePlot;