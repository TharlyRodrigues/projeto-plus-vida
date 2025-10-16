// Configurações do sistema
const config = {
  apiUrl: "http://localhost:3000/api",
  unidades: ["Hospital", "Clínica", "Laboratório", "Home Care"],
  especialidades: ["Médico", "Enfermeiro", "Técnico"],
  status: ["Ativo", "Inativo", "Em Férias", "Afastado"],
};

// Funções de Autenticação e Segurança
class Auth {
  static async login(email, senha) {
    try {
      const response = await fetch(`${config.apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user || {}));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    }
  }

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "admin.html";
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token; // Simplificado - em produção, verificar expiração
  }

  static getToken() {
    return localStorage.getItem("token");
  }

  static getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
}

// Funções de Gestão de Unidades
class Unidades {
  static async listar() {
    try {
      const response = await fetch(`${config.apiUrl}/unidades`, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao listar unidades:", error);
      return [];
    }
  }

  static async cadastrar(unidade) {
    try {
      const response = await fetch(`${config.apiUrl}/unidades`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.getToken()}`,
        },
        body: JSON.stringify(unidade),
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao cadastrar unidade:", error);
      return null;
    }
  }

  static async excluir(id) {
    try {
      const response = await fetch(`${config.apiUrl}/unidades/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao excluir unidade:", error);
      return null;
    }
  }
}

// Funções de Gestão de Pacientes
class Pacientes {
  static async listar() {
    try {
      const response = await fetch(`${config.apiUrl}/pacientes`, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao listar pacientes:", error);
      return [];
    }
  }

  static async cadastrar(paciente) {
    try {
      const response = await fetch(`${config.apiUrl}/pacientes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.getToken()}`,
        },
        body: JSON.stringify(paciente),
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
      return null;
    }
  }

  static async buscarPorCPF(cpf) {
    try {
      const response = await fetch(`${config.apiUrl}/pacientes/cpf/${cpf}`, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar paciente:", error);
      return null;
    }
  }

  static async editar(id, paciente) {
    try {
      const response = await fetch(`${config.apiUrl}/pacientes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.getToken()}`,
        },
        body: JSON.stringify(paciente),
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao editar paciente:", error);
      return null;
    }
  }
}

// Funções de Gestão de Profissionais
class Profissionais {
  static async listar() {
    try {
      const response = await fetch(`${config.apiUrl}/profissionais`, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao listar profissionais:", error);
      return [];
    }
  }

  static async cadastrar(profissional) {
    try {
      const response = await fetch(`${config.apiUrl}/profissionais`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.getToken()}`,
        },
        body: JSON.stringify(profissional),
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao cadastrar profissional:", error);
      return null;
    }
  }

  static async editar(id, profissional) {
    try {
      const response = await fetch(`${config.apiUrl}/profissionais/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.getToken()}`,
        },
        body: JSON.stringify(profissional),
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao editar profissional:", error);
      return null;
    }
  }
}

// Funções de Telemedicina
class Telemedicina {
  static async listarConsultas() {
    try {
      const response = await fetch(`${config.apiUrl}/telemedicina/consultas`, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao listar consultas:", error);
      return [];
    }
  }

  static async agendarConsulta(consulta) {
    try {
      const response = await fetch(`${config.apiUrl}/telemedicina/consultas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.getToken()}`,
        },
        body: JSON.stringify(consulta),
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao agendar consulta:", error);
      return null;
    }
  }

  static async iniciarConsulta(id) {
    try {
      const response = await fetch(
        `${config.apiUrl}/telemedicina/consultas/${id}/iniciar`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Erro ao iniciar consulta:", error);
      return null;
    }
  }

  static async cancelarConsulta(id) {
    try {
      const response = await fetch(
        `${config.apiUrl}/telemedicina/consultas/${id}/cancelar`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Erro ao cancelar consulta:", error);
      return null;
    }
  }
}

// Funções de Auditoria
class Auditoria {
  static async listarLogs() {
    try {
      const response = await fetch(`${config.apiUrl}/auditoria/logs`, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao listar logs:", error);
      return [];
    }
  }

  static async registrarLog(acao, modulo, detalhes) {
    try {
      const response = await fetch(`${config.apiUrl}/auditoria/logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.getToken()}`,
        },
        body: JSON.stringify({
          acao,
          modulo,
          detalhes,
          usuario: Auth.getUser()?.nome || "Sistema",
          ip: await this.getIP(),
          dataHora: new Date().toISOString(),
        }),
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao registrar log:", error);
      return null;
    }
  }

  static async getIP() {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Erro ao obter IP:", error);
      return "0.0.0.0";
    }
  }
}

// Inicialização do sistema para páginas protegidas
function inicializarSistemaProtegido() {
  // Verificar autenticação para páginas protegidas
  if (!Auth.isAuthenticated()) {
    window.location.href = "admin.html";
    return false;
  }
  return true;
}

// Inicialização do sistema para página de login
function inicializarPaginaLogin() {
  // Se já está autenticado, redireciona para dashboard
  if (Auth.isAuthenticated()) {
    window.location.href = "dashboard.html";
    return false;
  }
  return true;
}

// Funções de carregamento de dados
async function carregarUnidades() {
  try {
    const unidades = await Unidades.listar();
    const tbody = document.getElementById("tabelaUnidades");
    if (tbody) {
      tbody.innerHTML = unidades
        .map(
          unidade => `
            <tr>
                <td>${unidade.nome}</td>
                <td>${unidade.tipo}</td>
                <td>${unidade.status}</td>
                <td>${unidade.capacidade}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="editarUnidade(${unidade.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="excluirUnidade(${unidade.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `
        )
        .join("");
    }
  } catch (error) {
    console.error("Erro ao carregar unidades:", error);
  }
}

async function carregarPacientes() {
  try {
    const pacientes = await Pacientes.listar();
    const tbody = document.getElementById("tabelaPacientes");
    if (tbody) {
      tbody.innerHTML = pacientes
        .map(
          paciente => `
            <tr>
                <td>${paciente.id}</td>
                <td>${paciente.nome}</td>
                <td>${paciente.cpf}</td>
                <td>${paciente.unidade}</td>
                <td>${paciente.ultimaConsulta || "N/A"}</td>
                <td>${paciente.status}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="editarPaciente(${
                      paciente.id
                    })">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-info" onclick="visualizarProntuario(${
                      paciente.id
                    })">
                        <i class="fas fa-file-medical"></i>
                    </button>
                </td>
            </tr>
        `
        )
        .join("");
    }
  } catch (error) {
    console.error("Erro ao carregar pacientes:", error);
  }
}

async function carregarProfissionais() {
  try {
    const profissionais = await Profissionais.listar();
    const tbody = document.getElementById("tabelaProfissionais");
    if (tbody) {
      tbody.innerHTML = profissionais
        .map(
          profissional => `
            <tr>
                <td>${profissional.id}</td>
                <td>${profissional.nome}</td>
                <td>${profissional.especialidade}</td>
                <td>${profissional.unidade}</td>
                <td>${profissional.status}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="editarProfissional(${profissional.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-info" onclick="visualizarAgenda(${profissional.id})">
                        <i class="fas fa-calendar"></i>
                    </button>
                </td>
            </tr>
        `
        )
        .join("");
    }
  } catch (error) {
    console.error("Erro ao carregar profissionais:", error);
  }
}

async function carregarTeleconsultas() {
  try {
    const consultas = await Telemedicina.listarConsultas();
    const tbody = document.getElementById("tabelaTeleconsultas");
    if (tbody) {
      tbody.innerHTML = consultas
        .map(
          consulta => `
            <tr>
                <td>${new Date(consulta.dataHora).toLocaleString()}</td>
                <td>${consulta.paciente}</td>
                <td>${consulta.profissional}</td>
                <td>${consulta.status}</td>
                <td>
                    <button class="btn btn-sm btn-success" onclick="iniciarConsulta(${
                      consulta.id
                    })" ${consulta.status !== "Agendada" ? "disabled" : ""}>
                        <i class="fas fa-video"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="cancelarConsulta(${
                      consulta.id
                    })" ${consulta.status !== "Agendada" ? "disabled" : ""}>
                        <i class="fas fa-times"></i>
                    </button>
                </td>
            </tr>
        `
        )
        .join("");
    }
  } catch (error) {
    console.error("Erro ao carregar teleconsultas:", error);
  }
}

async function carregarLogs() {
  try {
    const logs = await Auditoria.listarLogs();
    const tbody = document.getElementById("tabelaAuditoria");
    if (tbody) {
      tbody.innerHTML = logs
        .map(
          log => `
            <tr>
                <td>${new Date(log.dataHora).toLocaleString()}</td>
                <td>${log.usuario}</td>
                <td>${log.acao}</td>
                <td>${log.modulo}</td>
                <td>${log.ip}</td>
                <td>${log.detalhes}</td>
            </tr>
        `
        )
        .join("");
    }
  } catch (error) {
    console.error("Erro ao carregar logs:", error);
  }
}

// Configuração de event listeners
function configurarEventListeners() {
  // Form de nova unidade
  const formUnidade = document.getElementById("formUnidade");
  if (formUnidade) {
    formUnidade.addEventListener("submit", async e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const unidade = {
        nome: formData.get("nome"),
        tipo: formData.get("tipo"),
        endereco: formData.get("endereco"),
        capacidade: parseInt(formData.get("capacidade")),
      };

      const resultado = await Unidades.cadastrar(unidade);
      if (resultado) {
        await carregarUnidades();
        await Auditoria.registrarLog(
          "Cadastro",
          "Unidades",
          `Nova unidade cadastrada: ${unidade.nome}`
        );
        e.target.reset();
        // Fechar modal se existir
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("modalUnidade")
        );
        if (modal) modal.hide();
      }
    });
  }

  // Form de novo profissional
  const formNovoProfissional = document.getElementById("formNovoProfissional");
  if (formNovoProfissional) {
    formNovoProfissional.addEventListener("submit", async e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const profissional = {
        nome: formData.get("nome"),
        cpf: formData.get("cpf"),
        especialidade: formData.get("especialidade"),
        unidade: formData.get("unidade"),
        email: formData.get("email"),
        senha: formData.get("senha"),
      };

      const resultado = await Profissionais.cadastrar(profissional);
      if (resultado) {
        await carregarProfissionais();
        await Auditoria.registrarLog(
          "Cadastro",
          "Profissionais",
          `Novo profissional cadastrado: ${profissional.nome}`
        );
        e.target.reset();
        // Fechar modal se existir
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("modalProfissional")
        );
        if (modal) modal.hide();
      }
    });
  }

  // Form de novo paciente
  const formNovoPaciente = document.getElementById("formNovoPaciente");
  if (formNovoPaciente) {
    formNovoPaciente.addEventListener("submit", async e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const paciente = {
        nome: formData.get("nome"),
        cpf: formData.get("cpf"),
        email: formData.get("email"),
        telefone: formData.get("telefone"),
        unidade: formData.get("unidade"),
      };

      const resultado = await Pacientes.cadastrar(paciente);
      if (resultado) {
        await carregarPacientes();
        await Auditoria.registrarLog(
          "Cadastro",
          "Pacientes",
          `Novo paciente cadastrado: ${paciente.nome}`
        );
        e.target.reset();
        // Fechar modal se existir
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("modalPaciente")
        );
        if (modal) modal.hide();
      }
    });
  }

  // Botão de logout
  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      Auth.logout();
    });
  }
}

// Funções de manipulação de dados
async function editarUnidade(id) {
  // Implementar edição de unidade
  console.log("Editar unidade:", id);
}

async function excluirUnidade(id) {
  if (confirm("Tem certeza que deseja excluir esta unidade?")) {
    const resultado = await Unidades.excluir(id);
    if (resultado) {
      await carregarUnidades();
      await Auditoria.registrarLog(
        "Exclusão",
        "Unidades",
        `Unidade excluída: ID ${id}`
      );
    }
  }
}

async function editarPaciente(id) {
  // Implementar edição de paciente
  console.log("Editar paciente:", id);
}

async function visualizarProntuario(id) {
  // Implementar visualização de prontuário
  console.log("Visualizar prontuário:", id);
}

async function editarProfissional(id) {
  // Implementar edição de profissional
  console.log("Editar profissional:", id);
}

async function visualizarAgenda(id) {
  // Implementar visualização de agenda
  console.log("Visualizar agenda:", id);
}

async function iniciarConsulta(id) {
  const consulta = await Telemedicina.iniciarConsulta(id);
  if (consulta) {
    await Auditoria.registrarLog(
      "Início",
      "Telemedicina",
      `Consulta iniciada: ID ${id}`
    );
    window.location.href = `teleconsulta.html?id=${id}`;
  }
}

async function cancelarConsulta(id) {
  if (confirm("Tem certeza que deseja cancelar esta consulta?")) {
    const resultado = await Telemedicina.cancelarConsulta(id);
    if (resultado) {
      await carregarTeleconsultas();
      await Auditoria.registrarLog(
        "Cancelamento",
        "Telemedicina",
        `Consulta cancelada: ID ${id}`
      );
    }
  }
}

// Função para inicializar a página de login
function inicializarLogin() {
  if (!inicializarPaginaLogin()) return;

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async e => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      const success = await Auth.login(email, senha);
      if (success) {
        await Auditoria.registrarLog(
          "Login",
          "Sistema",
          `Usuário ${email} fez login`
        );
        window.location.href = "dashboard.html";
      } else {
        alert("Login falhou. Verifique suas credenciais.");
      }
    });
  }
}

// Função para inicializar dashboard/páginas protegidas
async function inicializarDashboard() {
  if (!inicializarSistemaProtegido()) return;

  try {
    // Carregar todos os dados iniciais
    await Promise.all([
      carregarUnidades(),
      carregarPacientes(),
      carregarProfissionais(),
      carregarTeleconsultas(),
      carregarLogs(),
    ]);

    configurarEventListeners();

    // Mostrar nome do usuário logado
    const user = Auth.getUser();
    const userElement = document.getElementById("userName");
    if (userElement && user) {
      userElement.textContent = user.nome || user.email;
    }
  } catch (error) {
    console.error("Erro ao inicializar dashboard:", error);
  }
}

// Inicialização automática baseada na página
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "admin.html" || currentPage === "index.html") {
    inicializarLogin();
  } else {
    inicializarDashboard();
  }
});
