import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



const donutChartInicial = {
  labels: ["Software", "Professional_Services", "Storage", "Non_disclosure_agreement", "Leases", "Networking"],
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

export function DonutChart() {
  const [donutChart, setDonutChart] = useState(donutChartInicial)

  useEffect(() => {
    fetch(process.env.BACKEND_URL + "api/contracts_by_type/")
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((data) => {
        //console.log(data)
        setDonutChart({ ...donutChart, datasets: [{ ...donutChart.datasets[0], data: [data.Software, data.Professional_Services, data.Storage, data.Non_disclosure_agreement, data.Leases, data.Networking] }] })
      })
  }, [])

  //console.log(donutChart)
  return <Doughnut data={donutChart} />;
}
