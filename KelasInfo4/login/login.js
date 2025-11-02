function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMessage = document.getElementById("error-message");

  // Data user (bisa dikembangkan nanti jadi dari database)
  const users = [
    { username: "info4", password: "informatika", name: "GAES", role: "mahasiswa" },
    { username: "marco", password: "150706", name: "Marco", role: "admin" }
  ];

  // Cek apakah user ada di list
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Simpan status login di localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userRole", user.role);

    // Arahkan ke halaman akademik
    window.location.href = "../akademik/akademik.html";
  } else {
    errorMessage.textContent = "❌ Username atau password salah!";
  }
}
