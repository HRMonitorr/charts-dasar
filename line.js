
const employeeLabel = [];
let employeeSalaryData = [];
let empHonorDivision = [];

async function getDummyData() {
  const apiUrl = "https://raw.githubusercontent.com/HRMonitorr/json/main/employee.json";

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    const lineChartData = await response.json();

    if (lineChartData.data && Array.isArray(lineChartData.data)) {
      employeeSalaryData = lineChartData.data.map((x) => x.salary && x.salary['basic-salary'] ? x.salary['basic-salary'] : 0);
      empHonorDivision = lineChartData.data.map((x) => x.salary && x.salary['honor-division'] ? x.salary['honor-division'] : 0);
      employeeLabel.push(...lineChartData.data.map((x) => x.username || ''));
    } else {
      console.error("Data is null or not an array:", lineChartData);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function dummyLineChart() {
  await getDummyData();

  const ctx = document.getElementById('lineChart').getContext('2d');

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: employeeLabel,
      datasets: [{
          label: 'Employee Basic salary',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          data: employeeSalaryData,
          fill: false
        },
        {
          label: 'Employee Honor Division',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          data: empHonorDivision,
          fill: false
        }
      ]
    },
    options: {
      tooltips: {
        mode: 'index'
      }
    }
  });
}

dummyLineChart();
