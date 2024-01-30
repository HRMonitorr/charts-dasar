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
    const pieChartData = await response.json();

    // Memastikan bahwa data yang diterima adalah array
    if (pieChartData.data && Array.isArray(pieChartData.data)) {
      // Mengisi array gaji dengan data yang diekstrak dari JSON
      employeeSalaryData = pieChartData.data.map((x) => x.salary && x.salary['basic-salary'] ? x.salary['basic-salary'] : 0);
      
      // Mengisi array bagian penghormatan dengan data yang diekstrak dari JSON
      empHonorDivision = pieChartData.data.map((x) => x.salary && x.salary['honor-division'] ? x.salary['honor-division'] : 0);
      
      // Mengisi array label karyawan dengan data yang diekstrak dari JSON, atau nilai default jika tidak ada
      employeeLabel.push(...pieChartData.data.map((x) => x.username || ''));
    } else {
      // Menampilkan pesan kesalahan jika data tidak sesuai atau tidak ada
      console.error("Data kosong atau bukan sebuah array:", pieChartData);
    }
  } catch (error) {
    // Menampilkan pesan kesalahan jika terjadi kesalahan saat mengambil data
    console.error("Error saat mengambil data:", error);
  }
}

// Fungsi untuk membuat Grafik Pai
async function dummyPieChart() {
  // Memanggil fungsi untuk mengambil dan memproses data
  await getDummyData();

  // Mendapatkan konteks canvas dengan ID 'pieChart'
  const ctx = document.getElementById('pieChart').getContext('2d');

  // Membuat Grafik Pai menggunakan Chart.js
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

// Memanggil fungsi untuk membuat Grafik Pai
dummyPieChart();
