
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
    const pieChartData = await response.json();

    if (pieChartData.data && Array.isArray(pieChartData.data)) {
      employeeSalaryData = pieChartData.data.map((x) => x.salary && x.salary['basic-salary'] ? x.salary['basic-salary'] : 0);
      empHonorDivision = pieChartData.data.map((x) => x.salary && x.salary['honor-division'] ? x.salary['honor-division'] : 0);
      employeeLabel.push(...pieChartData.data.map((x) => x.username || ''));
    } else {
      console.error("Data is null or not an array:", pieChartData);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function dummyPieChart() {
  await getDummyData();

  const ctx = document.getElementById('pieChart').getContext('2d');

  const chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: employeeLabel,
      datasets: [{
        data: employeeSalaryData,
        backgroundColor: ['red', 'blue', 'green', 'orange', 'purple']
      }]
    }
  });
}

dummyPieChart();
