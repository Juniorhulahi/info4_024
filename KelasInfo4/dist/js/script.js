if (!localStorage.getItem("isLoggedIn")) {
  window.location.href = "../login/login.html"
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "../login/login.html";
}




// ========== DATA MAHASISWA ==========
const mahasiswaList = [
  "Nurhaliza S Piga", "Rizka Nurudduha S", "Gerald Adinarto", "Marco Devander Hulahi",
  "M Fikri Palembang", "Sahdila Irwan", "Afif Ibnu Pratama", "M Usamah Adrian",
  "Aprilia Yakub", "Nurafni Abubakar", "Nazwa Ramadhani R.Fara", "Jihan Cumala Jufri",
  "Sartia", "Tiwi Lestari Umagapi", "Gita Sari Munir", "Nurbayti Kamila Ghandy",
  "Deby Ahsan", "Safitri Hafid", "Sofia Pratiwi", "Riska Sapsuha",
  "Difandri Yainahu", "Putra Yonathan", "M Imam Sangaji", "Nunjairina Farangi"
];

// ========== GENERATE DAFTAR HADIR ==========
const tampilkanAbsen = document.getElementById("tampilkanAbsen");
if (tampilkanAbsen) {
  tampilkanAbsen.addEventListener("click", () => {
    const matkul = document.getElementById("matkul").value;
    const pertemuan = document.getElementById("pertemuan").value;
    const absenBody = document.getElementById("absenBody");

    if (!matkul || !pertemuan) {
      alert("Pilih mata kuliah dan pertemuan terlebih dahulu!");
      return;
    }

    absenBody.innerHTML = ""; // Kosongkan tabel dulu

    mahasiswaList.forEach((nama, index) => {
      const row = `
        <tr>
          <td>${index + 1}</td>
          <td>${nama}</td>
          <td>
            <select class="status">
              <option>Hadir</option>
              <option>Izin</option>
              <option>Sakit</option>
              <option>Alpa</option>
            </select>
          </td>
          <td><input type="text" class="keterangan" placeholder="Keterangan..."></td>
        </tr>
      `;
      absenBody.innerHTML += row;
    });

    // Simpan ke localStorage
    const key = `${matkul}_${pertemuan}`;
    localStorage.setItem("lastAbsenKey", key);

    alert(`Daftar hadir untuk ${matkul} (${pertemuan}) ditampilkan!`);
  });
}

// ========== CETAK ABSEN ==========
const printAbsen = document.getElementById("printAbsen");
if (printAbsen) {
  printAbsen.addEventListener("click", () => {
    window.print();
  });
}

// ========== SIMPAN ABSEN KE LOCALSTORAGE ==========
const saveAbsen = document.getElementById("saveAbsen");
if (saveAbsen) {
  saveAbsen.addEventListener("click", () => {
    const matkul = document.getElementById("matkul").value;
    const pertemuan = document.getElementById("pertemuan").value;

    if (!matkul || !pertemuan) {
      alert("⚠️ Harap pilih mata kuliah dan pertemuan terlebih dahulu!");
      return;
    }

    const absenRows = document.querySelectorAll("#absenBody tr");
    const dataAbsen = [];

    absenRows.forEach((row) => {
      const nama = row.cells[1].textContent;
      const status = row.querySelector(".status").value;
      const keterangan = row.querySelector(".keterangan").value;
      dataAbsen.push({ nama, status, keterangan });
    });

    const key = `absen_${matkul}_${pertemuan}`;
    localStorage.setItem(key, JSON.stringify(dataAbsen));

    alert("✅ Data absen berhasil disimpan secara lokal!");
  });
}

// ========== LIHAT DATA TERSIMPAN ==========
const lihatRekap = document.getElementById("lihatRekap");
if (lihatRekap) {
  lihatRekap.addEventListener("click", () => {
    const rekapContainer = document.getElementById("rekapContainer");
    const rekapContent = document.getElementById("rekapContent");
    rekapContent.innerHTML = ""; // kosongkan isi lama

    let found = false;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("absen_")) {
        const data = JSON.parse(localStorage.getItem(key));
        if (data && Array.isArray(data)) {
          found = true;
          rekapContent.innerHTML += `
            <h4 style="margin-top:15px;">${key.replace("absen_", "").replace("_", " - ")}</h4>
            <table border="1" style="width:100%; border-collapse: collapse;">
              <tr><th>Nama</th><th>Status</th><th>Keterangan</th></tr>
              ${data.map(d => `
                <tr>
                  <td>${d.nama}</td>
                  <td>${d.status}</td>
                  <td>${d.keterangan || "-"}</td>
                </tr>
              `).join("")}
            </table>
          `;
        }
      }
    }

    if (!found) {
      rekapContent.innerHTML = "<p style='color:red;'>Belum ada data absen tersimpan.</p>";
    }

    // tampilkan section rekap
    rekapContainer.style.display = "block";
    rekapContainer.scrollIntoView({ behavior: "smooth" });
  });
}

// ========== TOMBOL AKADEMIK ========== 
const btnAkademik = document.getElementById("btnAkademik");
if (btnAkademik) {
  btnAkademik.addEventListener("click", () => {
    // arahkan ke halaman utama akademik (ganti sesuai nama file kamu)
    window.location.href = "../akademik/akademik.html"; 
    // atau jika mau kembali ke halaman login:
    // window.location.href = "../login/login.html";
  });
}
