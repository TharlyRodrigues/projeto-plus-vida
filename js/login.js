document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  // Verificar credenciais do administrador
  if (email === config.admin.email && senha === config.admin.senha) {
    // Criar objeto do usuário logado
    const usuario = {
      nome: "Administrador",
      email: config.admin.email,
      tipo: "admin",
    };

    // Salvar objeto usuário no localStorage
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    // Redirecionar para o dashboard
    window.location.href = "dashboard.html";
  } else {
    alert("Email ou senha inválidos!");
  }
});
