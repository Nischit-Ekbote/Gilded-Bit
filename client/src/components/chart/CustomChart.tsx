import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  ChartOptions,
  ChartData
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/api/v1";

interface ChartTypes {
  element: string;
  type: string;
}

const ChartComponent: React.FC<ChartTypes> = ({ element, type }) => {
  const [prices, setPrices] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/${element}/getData`);
        const data = await response.json();

        if (response.ok) {
          // Dynamically access the type property (e.g. "18k", "20k", "24k")
          const fetchedPrices = data.map((item: { [key: string]: number }) => item[type]);
          const fetchedLabels = data.map((item: { date: string }) => item.date);
          setPrices(fetchedPrices);
          setLabels(fetchedLabels);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [element, type]);

  // Generate point colors based on price changes
  const pointBackgroundColors = prices.map((price, index) => {
    if (index === 0) return 'rgba(75, 192, 192, 1)'; // Default color for the first point
    return price < prices[index - 1] ? 'red' : '#00FF29';
  });

  // Chart data
  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Gold Price',
        data: prices,
        fill: false,
        borderColor: 'white',
        borderWidth: 2,
        tension: 0,
        pointBackgroundColor: pointBackgroundColors,
        pointRadius: 3.3,
        pointHoverRadius: 7,
        pointBorderWidth: 0,
      },
    ],
  };

  // Chart options with tooltips enabled
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Gold Price Over Time for ${element} (${type})`,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        display: false, // Hides X axis labels
      },
      y: {
        display: false, // Hides Y axis labels
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
