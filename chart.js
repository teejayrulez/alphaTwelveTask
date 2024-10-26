const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [650, 950, 780, 400, 1000, 580, 850, 380, 850, 650, 950, 600],
        backgroundColor: ["#8576ff"],
        borderColor: ["#8576ff"],
        borderRadius: 2,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 200,
        },
      },
    },
  },
});
