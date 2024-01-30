// Inisialisasi array untuk menyimpan label karyawan, data gaji, dan data bagian penghormatan
const employeeLabel = [];
let employeeSalaryData = [];
let empHonorDivision = [];

// Fungsi untuk mengambil data dummy dari file JSON yang di-host di GitHub
async function getDummyData() {
  const apiUrl = "https://raw.githubusercontent.com/HRMonitorr/json/main/employee.json";

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    // Mengambil respons dari URL menggunakan metode GET
    const response = await fetch(apiUrl, requestOptions);
    
    // Mengonversi respons ke format JSON
    const lineChartData = await response.json();

    // Memastikan bahwa data yang diterima adalah array
    if (lineChartData.data && Array.isArray(lineChartData.data)) {
      // Mengisi array gaji dengan data yang diekstrak dari JSON
      employeeSalaryData = lineChartData.data.map((x) => x.salary && x.salary['basic-salary'] ? x.salary['basic-salary'] : 0);
      
      // Mengisi array bagian penghormatan dengan data yang diekstrak dari JSON
      empHonorDivision = lineChartData.data.map((x) => x.salary && x.salary['honor-division'] ? x.salary['honor-division'] : 0);
      
      // Mengisi array label karyawan dengan data yang diekstrak dari JSON, atau nilai default jika tidak ada
      employeeLabel.push(...lineChartData.data.map((x) => x.username || ''));
    } else {
      // Menampilkan pesan kesalahan jika data tidak sesuai atau tidak ada
      console.error("Data kosong atau bukan sebuah array:", lineChartData);
    }
  } catch (error) {
    // Menampilkan pesan kesalahan jika terjadi kesalahan saat mengambil data
    console.error("Error saat mengambil data:", error);
  }
}

// Fungsi untuk membuat Grafik Garis
async function dummyLineChart() {
  // Memanggil fungsi untuk mengambil dan memproses data
  await getDummyData();

  // Mendapatkan konteks canvas dengan ID 'lineChart'
  const ctx = document.getElementById('lineChart').getContext('2d');

  // Membuat Grafik Garis menggunakan Chart.js
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: employeeLabel,
      datasets: [
        {
          label: 'Gaji Dasar Karyawan',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          data: employeeSalaryData,
          fill: false
        },
        {
          label: 'Bagian Penghormatan Karyawan',
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

// Memanggil fungsi untuk membuat Grafik Garis
dummyLineChart();
