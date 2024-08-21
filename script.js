const button = document.querySelector('.button__add__task')
const input = document.querySelector('.input__task')
const listaCompleta = document.querySelector('.list__tasks')
document.querySelector("#btn").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode")
})

let minhaListaDeItens = []

function adicionarNovaTarefa() {
    
    if(input.value.trim()=== ''){
        alert("Por favor, insira uma tarefa!");
        return;
    }
    
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false,
    })

    input.value = ''

    mostrarTarefas()
}

function mostrarTarefas() {
    let novaLi = ''

    minhaListaDeItens.forEach((item, posicao) => {
        novaLi =
            novaLi +
            `

            <li class="task ${item.concluida && 'done'}">
                <i class="bi bi-check-circle" onclick="concluirTarefa(${posicao})"></i>
                <p>${item.tarefa}</p>
                <i class="bi bi-trash" onclick="deletarItem(${posicao})"></i>
            </li>      
       
            `
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

    mostrarTarefas()

}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1)

    mostrarTarefas()
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }

    mostrarTarefas()
}

recarregarTarefas()
button.addEventListener('click', adicionarNovaTarefa)

