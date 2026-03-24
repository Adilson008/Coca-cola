function adicionarTarefa(){
    //let mensagem = "Tarefa adicionada com sucesso !"
    
    let inputTarefa =  document.getElementById("inputTarefa")
    let Tarefa = inputTarefa.value
    console.log(Tarefa)
    document.getElementById("mensagem").textContent = Tarefa;

    let listaTarefas = document.getElementById("listaTarefas")
    let novaTarefa = document.createElement("li")

    novaTarefa.textContent = Tarefa


    listaTarefas.appendChild(novaTarefa)
    
    inputTarefa.value = ""



}
