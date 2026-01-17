import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ExpenseContext } from '../context/ExpenseContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = () => {
  const { state } = useContext(ExpenseContext);

  const categoryTotals = state.categories.reduce((acc, category) => {
    acc[category] = state.expenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384'
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Spending Breakdown by Category'
      }
    }
  };

  return (
    <div className="charts-container">
      <h2>Spending Charts</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default Charts;
