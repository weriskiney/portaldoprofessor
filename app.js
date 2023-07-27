// Importar o módulo firebase/auth
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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
	        // TODO: implementar essa lógica usando alguma forma de identificar a função do usuário
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

// Exportar as funções e variáveis no nível superior do módulo
export { loginWithGoogle, mostrarGrupos, sortearGrupo, turmas, frases };
