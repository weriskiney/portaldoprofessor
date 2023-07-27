// Importar o módulo firebase/auth
import { getAuth, GoogleAuthProvider, signInWithPopup } from "./portaldoprofessor/node_modules/@firebase/auth-compat/dist/index.esm.js"; // "firebase/auth-compat";
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNts7rKe7DOdQ1QJIe8nbTw-894dWY1q4",
  authDomain: "portal-do-professor-77742.firebaseapp.com",
  projectId: "portal-do-professor-77742",
  storageBucket: "portal-do-professor-77742.appspot.com",
  messagingSenderId: "1014421614822",
  appId: "1:1014421614822:web:d89778a834263d656c4b27",
  measurementId: "G-C7K0LG28NL"
};

//Initialize firebase app
const app = initializeApp(firebaseConfig);

      const turmas = {
        "Turma 1": ["Grupo 1", "Grupo 2", "Grupo 3", "Grupo 4"],
        "Turma 2": ["Grupo 1", "Grupo 2", "Grupo 3", "Grupo 4"],
        "Turma 3": ["Grupo 1", "Grupo 2", "Grupo 3", "Grupo 4"]
      };
	  
	const frases = [
        "Não se preocupe com o resultado do sorteio, você já é um vencedor!"
		];
      
     function mostrarGrupos() {
        const turmaSelecionada = document.getElementById("turmas").value;
        const grupos = turmas[turmaSelecionada];
        let gruposHtml = "";
        for (let i = 0; i < grupos.length; i++) {
          gruposHtml += "<input type='checkbox' name='grupos' value='" + grupos[i] + "'>" + grupos[i] + "<br>";
        }
        document.getElementById("grupos").innerHTML = gruposHtml;
      }
      
      function sortearGrupo() {
        const gruposSelecionados = document.getElementsByName("grupos");
        let grupos = [];
        for (let i = 0; i < gruposSelecionados.length; i++) {
          if (gruposSelecionados[i].checked) {
            grupos.push(gruposSelecionados[i].value);
          }
        }
       
	const grupoSorteado = grupos[Math.floor(Math.random() * grupos.length)];
        document.getElementById("resultado").innerHTML = "Grupo sorteado: " + grupoSorteado;
		
		document.getElementById("probabilidade").innerHTML = "Probabilidade: " + (1 / grupos.length * 100).toFixed(2) + "%";
		
		const indiceFrase = Math.floor(Math.random() * frases.length);
		document.getElementById("frase").innerHTML = frases[indiceFrase];
      }
	  
	function loginWithGoogle() {
	    
	    // Pegar uma referência ao objeto Auth
	    const auth = getAuth();
	    
	    // Criar uma instância do provedor do Google
	    const provider = new GoogleAuthProvider();
	    
	    // Configurar as opções de login
	    provider.setCustomParameters({
	      prompt: "select_account"
	    });
	    
	    // Fazer login com o Google usando uma janela popup
	    signInWithPopup(auth, provider)
	      .then((userCredential) => {
	        // Login bem sucedido
	        // Pegar o objeto User
	        const user = userCredential.user;
	        
	        // Mostrar uma mensagem de boas-vindas com o nome ou e-mail do usuário
	        alert("Bem-vindo(a), " + (user.displayName || user.email) + "!");
	        
	        // Mostrar a página de avaliação se o usuário for professor ou a página de notas se o usuário for aluno
	        // Verificar a função do usuário
		      const funcao = verificarFuncao(user);
		      
		      // Mostrar a div correspondente à função do usuário
		      if (funcao === "professor") {
		        // Mostrar a div de avaliação
		        document.getElementById("avaliacao").style.display = "block";
		      } else if (funcao === "aluno") {
		        // Mostrar a div de notas
		        document.getElementById("notas").style.display = "block";
		      } else {
		        // Mostrar uma mensagem de erro
		        alert("Você não tem permissão para acessar este portal.");
		      }
	      })
	      .catch((error) => {
		  // Login falhou
		  // Pegar o código e a mensagem do erro
		  const errorCode = error.code;
		  const errorMessage = error.message;
		
		  // Verificar se o erro é do tipo "auth/popup-closed-by-user"
		  if (errorCode === "auth/popup-closed-by-user") {
		    // Mostrar uma mensagem informando que o usuário cancelou o login
		    alert("Você cancelou o login com o Google.");
		  } else {
		    // Mostrar uma mensagem de erro genérica
		    alert("Erro ao fazer login: " + errorMessage);
		  }
	      });
	  }

	function verificarFuncao(user) {
	  // Pegar o e-mail do usuário
	  const email = user.email;
	  
	  // Verificar 
	if (email == "weriskiney.almeida@ufob.edu.br" || email == "weriskiney@gmail.com") {
	    // O usuário é um professor
	    return "professor";
	  } else if (email != "weriskiney.almeida@ufob.edu.br" && email.endsWith("@ufob.edu.br")) {
	    // O usuário é um aluno
	    return "aluno";
        } else {	  
	    // nenhum
	    result = "invalido";
	  }
	}

	function pegarDados() {
	  // Definir a URL do arquivo JSON no GitHub Pages
	  const url = "https://seu-usuario.github.io/seu-projeto/data.json";
	  
	  // Fazer uma requisição GET usando a API Fetch
	  fetch(url)
	    .then((response) => {
	      // Verificar se a resposta foi bem sucedida
	      if (response.ok) {
	        // Converter a resposta em um objeto JSON
	        return response.json();
	      } else {
	        // Lançar um erro com o status da resposta
	        throw new Error("Erro ao pegar os dados: " + response.status);
	      }
	    })
	    .then((data) => {
	      // Usar os dados do JSON para alguma finalidade
	      // TODO: implementar essa lógica usando os dados dos professores, das turmas e dos alunos
	    })
	    .catch((error) => {
	      // Mostrar uma mensagem de erro
	      alert(error.message);
	    });
	}
	
	function enviarDados(dados) {
	  // Definir a URL da GitHub API para atualizar o arquivo JSON no seu repositório
	  const url = "https://api.github.com/repos/seu-usuario/seu-projeto/contents/data.json";
	  
	  // Definir o seu token de acesso pessoal do GitHub
	  const token = "seu-token-de-acesso-pessoal";
	  
	  // Definir as opções da requisição POST usando a API Fetch
	  const options = {
	    method: "PUT",
	    headers: {
	      "Authorization": "token " + token,
	      "Content-Type": "application/json"
	    },
	    body: JSON.stringify({
	      message: "Atualizar os dados da avaliação dos alunos",
	      content: btoa(JSON.stringify(dados)), // Codificar os dados em formato base64
	      sha: "o-sha-do-arquivo-json" // O SHA é um identificador único do arquivo JSON no GitHub. Você pode obtê-lo usando a função pegarDados e acessando a propriedade data.sha da resposta.
	    })
	  };
	  
	  // Fazer uma requisição POST usando a API Fetch
	  fetch(url, options)
	    .then((response) => {
	      // Verificar se a resposta foi bem sucedida
	      if (response.ok) {
	        // Mostrar uma mensagem de confirmação
	        alert("Os dados da avaliação dos alunos foram enviados com sucesso.");
	      } else {
	        // Lançar um erro com o status da resposta
	        throw new Error("Erro ao enviar os dados: " + response.status);
	      }
	    })
	    .catch((error) => {
	      // Mostrar uma mensagem de erro
	      alert(error.message);
	    });
	}

// Exportar as funções e variáveis no nível superior do módulo
export { enviarDados, pegarDados, loginWithGoogle, mostrarGrupos, sortearGrupo, turmas, frases };
