<template>
    <div id="principal">
        <div class="logo" v-html="logoUnime"></div>
        <div class="titulo">
            <h1>Cadastramento de Alunos</h1>
            <button id="voltar"><a href="/">&#8630; | Voltar</a></button>
        </div>
        <div class="linhaSombreada"></div>
        <div class="exclusao">
            <div class="excluirRa">
                <div class="campoExclusao">
                    <label for="ra">Excluir aluno pelo R.A</label> <br>
                    <input type="number" name="r.a" id="ra" v-model="campoExcluir">
                </div>
                    <button @click='deletar()' class="botaoExcluir">&#128465; | Excluir Aluno</button>
            </div>
            
            <div class="totalAlunos">
                <h5>Total de alunos Cadastrados<br>{{totalCadastrados}}</h5>
            </div>
            <div class="totalExcluidos">
                <h5>Total de alunos Excluidos<br>{{totalExcluidos}}</h5>
            </div>
            
        </div>
        <div class="informacoes">
            <h3>Alunos Cadastrados</h3>
            <div>
                <table>
                    <tr class="tituloTabela">
                        <td>Nome do Aluno</td>
                        <td class="tdRA">R.A.</td>
                        <td>Nome do Curso</td>
                        <td class="tdRA">Ação</td>
                    </tr>
                    <tr v-for="aluno in alunos" :key="aluno.id">
                        <td>{{aluno.nome}}</td>
                        <td class="tdRA">{{aluno.ra}}</td>
                        <td>{{aluno.curso}}</td>
                        <td class="tdRA" @click="apagarLinha(aluno.id, aluno.nome, aluno.ra, aluno.curso)"><button>&#128465;</button></td>
                    </tr>
                </table>
            </div>
            <br>
            <h3>Alunos Removidos</h3>
            <div>
                <table>
                    <tr class="tituloTabela">
                        <td>Nome do Aluno</td>
                        <td class="tdRA">R.A.</td>
                        <td>Nome do Curso</td>
                        <td class="tdRA">Ação Definitiva</td>
                    </tr>
                    <tr v-for="excluido in excluidos" :key="excluido.id">
                        <td><del>{{excluido.nome}}</del></td>
                        <td class="tdRA">{{excluido.ra}}</td>
                        <td>{{excluido.curso}}</td>
                        <td class="tdRA" @click="apagarLinhaDefinitiva(excluido.id)"><button>&#128465;</button></td>
                    </tr>
                </table>
            </div>
        </div>
        <div>
            <footer>
                <p>Projeto de conclusão do curso de férias: Javascript e VueJS</p>
                <p>Desenvolvido por: <span>Júlio Alves Barreto</span></p>
            </footer>
        </div>
    </div>
</template>
<script>

import axios from 'axios'

export default({
    
    data(){
        return{
        logoUnime: '<img width="120" src="https://cmspim.cogna.digital/unime/public/2019-10/logo-unime-p.png" alt="Era pra ser o logo da unime">',
        alunos:[],
        excluidos:[],
        campoExcluir:'',
        totalExcluidos: '0',
        totalCadastrados: '0',
        endpoint:"http://170.245.239.157:3000/alunos",
        endpointExcluidos: "http://170.245.239.157:3001/excluidos",
        }
    },
    mounted(){
        this.pegarAlunos()
        this.pegarExcluidos()
    
    },
    methods: {

         pegarAlunos(){
             fetch(this.endpoint).then(resposta => resposta.json()).then(json =>{
                 this.alunos = json
                 this.totalCadastrados = json.length
             }) 
         },

        pegarExcluidos(){
             fetch(this.endpointExcluidos).then(resposta => resposta.json()).then(json =>{
                 this.excluidos = json
                 this.totalExcluidos = json.length
             }) 
         },
 
        deletar(){
            if(this.campoExclusao == ''){
            alert("Preencha o R.A. Corretamente!")
        }
        else{
            var nomeAluno = ''
            var raAluno = ''
            var cursoAluno =''
            var encontrado = 0
            var idAlunoEncontrado = 0
            fetch(this.endpoint).then(resposta => resposta.json()).then(json =>{
            json.forEach(aluno => {
            if(aluno.ra == this.campoExcluir){
                encontrado = 1
                idAlunoEncontrado = aluno.id
                nomeAluno = aluno.nome
                raAluno = aluno.ra
                cursoAluno = aluno.curso
                  
            }
        })
        if(encontrado>0){
            if(confirm('Deseja Realmente excluir?')){
            axios.delete(`http://170.245.239.157:3000/alunos/${idAlunoEncontrado}`)
            alert("Aluno Excluido!")
            axios.post(`http://170.245.239.157:3001/excluidos/`, {
                nome: nomeAluno,
                ra: raAluno,
                curso: cursoAluno,
            })
            
            this.campoExcluir = ''
            document.location.reload(true)
            }
            
        }else{
            alert("R.A. Não encontrado!")
            this.campoExcluir = ''
        }
        })
        }  
        },

        apagarLinha(id1, nome1, ra1, curso1){
            if(confirm('Deseja Realmente excluir?')){
            axios.delete(`http://170.245.239.157:3000/alunos/${id1}`)
            this.campoExcluir = ''
            axios.post(`http://170.245.239.157:3001/excluidos/`, {
                nome: nome1,
                ra: ra1,
                curso: curso1,
            })    
            
            }
            document.location.reload(true)
        },

        apagarLinhaDefinitiva(id){
            if(confirm('Dados será apagados permanentemente, deseja continuar?!')){
            axios.delete(`http://170.245.239.157:3001/excluidos/${id}`)
             alert("Aluno Excluido!")
            }
            document.location.reload(true)
        }
        
        
        
        
    }
    
})
</script>

<style>
body{
            background-color: rgb(223, 223, 223);
        }
        #principal{
            
            margin-left: 25%;
            margin-right: 25%;
        }
        .logo{
            text-align: center;
            margin-top: 20px;
        }
        h3, h1{
            color: red;
            font-weight: bold;
        }
        a{
            text-decoration: none;
            color: white;
        }
        #voltar{
            font-size: 13px;
            margin-top: 25px;
            background: green;
            border-radius: 8px;
            font-weight: bold;
            align-items: unset;
            justify-content: right;
        }
        a:hover{
            color: black;
            font-size: 16px;
        }
        .titulo{
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            color: red;
        }
        .linhaSombreada{
            border: 1px solid black;
            box-shadow: 1px 1px red;
        }
        .exclusao{
            background-color:rgb(223, 223, 223);
            margin-top: 25px;
            display: flex;
            justify-content: space-between;
            color: red;
            font-weight: bold;
            height: 150px;
        }
        .campoExclusao{
            padding-top: 15px;
        }
        #ra{
            width: 90%;
        }
        
        .informacoes{
            background-color: white;
            margin-top: 25px;
            padding-top: 20px;
            padding-left: 15px;
            padding-bottom: 15px;
        }
        h6{
            color: red;
            font-weight: bold;
        }
        footer{
            margin-top: 10px;
            margin-left: 12px;
        }
        p{
            margin: 0px;
            font-size: 12px;
        }
        span{
            color: red;
            font-weight: bold;
            font-size: 13px;
        }
        .excluirRa{
            background-color: white;
            width: 450px;
            display: flex;
            justify-content: space-between;
            border: 2px solid rgb(155, 152, 152);
            padding: 5%;
            border-radius: 8px;
        }
        .botaoExcluir{
            background-color: red;
            color: white;
            border-radius: 8px;
            font-size: 13px;
            height: 40px;
            margin-top: 15px;
        }
        .totalAlunos{
            background-color: red;
            border: 2px solid rgb(155, 152, 152);
            padding: 1%;
            width: 25%;
            margin-left: 20px;
            border-radius: 8px;
        }
        .totalExcluidos{
            background-color: gray;
            border: 2px solid rgb(155, 152, 152);
            padding: 1%;
            width: 25%;
            margin-left: 20px;
            border-radius: 8px;
        }
        h5{
            color: white;
            font-size: 20px;
            text-align: center;
            padding: 0px 10px;
        }
        .tituloTabela{
            background-color: grey;
            color: white;
            
        }
        td{
            border: 1px solid black;
            width: 250px;
        }
        .tdRA{
            width: 100px;
            text-align: center;
        }
</style>
