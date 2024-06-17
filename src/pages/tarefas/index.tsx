import { useEffect, useState } from "react" 
import FormTarefas from "../../components/formtarefas"
import api from "../../helpers/axios"

interface Tarefa{
    id: number
    title: string
    completed: boolean
} 

export default function Tarefas(){
    const [tarefas, setTarefas] = useState<Tarefa[]>([])

    async function getTarefas(){
    const response = await api.get('/tarefas')
    if(response.status == 200){
        setTarefas(response.data)
    }
}

function adicionarTarefa() {
    if(!tituloTarefa) return
    const novaTarefa = {
        title: tituloTarefa,
        completed: false
    }

    api.post('/tarefas', novaTarefa)
    .then(() => {
        setTituloTarefa('')
        getTarefas()
    })
    .catch(error => {
        console.log(error)
    })
}

function apagarTarefa(id: number) {
    api.delete(`/tarefas/${id}`)
    .then(() => {
        getTarefas()
    })
    .catch(error => {
        console.log(error)
    })
}

    function atualizarTarefas(){ 
        fetch('https://workshop-node-ts-intro-exemplo1.onrender.com/task')
        .then((dados) => dados.json())
        .then((tarefas) => setTarefas(tarefas))
    }

    useEffect(() => {
        atualizarTarefas()
    },[])

    return (
        <>
            <h1>Tarefas</h1>
            <FormTarefas atualizarTarefas={atualizarTarefas}/>
            <ul>
                {
                    tarefas.map(tarefa => (
                        <li key={tarefa.id}>
                            {tarefa.title} - {tarefa.completed ? 'Sim' : 'Não'}
                        </li>
                    ))
                }
            </ul>
        </>
    )
}