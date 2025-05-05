import React from 'react';
import './GeminiMoodDonut.css';

const moodData = [
  { value: 20, label: 'انرژی بالا 🤩', color: '#4caf50' },
  { value: 15, label: 'فکر و خیال 🤔', color: '#2196f3' },
  { value: 10, label: 'خلوت می‌خوام 😶', color: '#9e9e9e' },
  { value: 15, label: 'دلم گرفته 😔', color: '#f44336' },
  { value: 20, label: 'کُری خوندن و شوخی 😂', color: '#ff9800' },
  { value: 20, label: 'هایپر و خنده بی‌دلیل 😆', color: '#e91e63' },
];

const GeminiMoodDonut = () => {
  const total = moodData.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  const gradientParts = moodData.map((item) => {
    const angle = (item.value / total) * 360;
    const part = `${item.color} ${currentAngle}deg ${currentAngle + angle}deg`;
    currentAngle += angle;
    return part;
  });

  const gradient = `conic-gradient(${gradientParts.join(', ')})`;

  return (
    <div className="gemini-chart-wrapper">
      <div className="gemini-donut" style={{ background: gradient }}></div>
      <ul className="gemini-legend">
        {moodData.map((item, index) => (
          <li key={index}>
            <span className="color-box" style={{ backgroundColor: item.color }}></span>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GeminiMoodDonut;
