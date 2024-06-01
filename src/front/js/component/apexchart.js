import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



const chartPieIncial = {
  labels: ["Accounting", "HR", "IT", "Marketing", "Sales", "Supply_Chain"],
  datasets: [
    {
      label: '# of Contracts',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export function ApexChart() {
  const [chartPie, setchartPie] = useState (chartPieIncial)

  useEffect (()=>{
    fetch (process.env.BACKEND_URL + "api/contracts_by_bu/")
    .then((response) => {
      if (response.ok){
        return response.json()
      }
      })
    .then((data) => {
      console.log(data)
      setchartPie({...chartPie, datasets:[{...chartPie.datasets[0], data:[data.Accounting, data.HR, data.IT, data.Marketing, data.Sales, data.Supply_Chain]}]})  
    })
  }, [])

  console.log(chartPie)
  return <Pie data={chartPie} />;
}
