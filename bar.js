
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
    const barChartData = await response.json();

    if (barChartData.data && Array.isArray(barChartData.data)) {
      employeeSalaryData = barChartData.data.map((x) => x.salary && x.salary['basic-salary'] ? x.salary['basic-salary'] : 0);
      empHonorDivision = barChartData.data.map((x) => x.salary && x.salary['honor-division'] ? x.salary['honor-division'] : 0);
      employeeLabel.push(...barChartData.data.map((x) => x.username || ''));
    } else {
      console.error("Data is null or not an array:", barChartData);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function dummyBarChart() {
  await getDummyData();

  const ctx = document.getElementById('barChart').getContext('2d');

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: employeeLabel,
      datasets: [{
          label: 'Employee Basic salary',
          backgroundColor: 'blue',
          borderColor: 'rgb(255, 99, 132)',
          data: employeeSalaryData
        },
        {
          label: 'Employee Honor Division',
          backgroundColor: 'pink',
          borderColor: 'rgb(255, 99, 132)',
          data: empHonorDivision
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

dummyBarChart();
