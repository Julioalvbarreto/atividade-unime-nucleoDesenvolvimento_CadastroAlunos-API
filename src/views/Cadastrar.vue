<template>
    <div id="principal">
        <div class="logo" v-html="logoUnime"></div>
        <div class="titulo">
            <h2>{{titulo}}</h2>
            <button id="excluir"><a href="/registros">&#128465; Excluir aluno</a></button>
        </div>
        <div class="linhaSombreada"></div>
        <div class="cadastramento">
            <div>
                <label for="nome">Nome</label> <br>
                <input type="text" name="nome" id="nome" v-model="alunos.nome">
            </div>
            <div>
                <label for="r.a">R.A.</label> <br>
                <input type="number" name="r.a" id="ra" v-model="alunos.ra">
            </div>
            <div>
                <label for="curso">Curso</label> <br>
                <select name="curso" id="curso" v-model="alunos.curso">
                    <option  v-bind:value="curso" v-for="curso in cursos" v-bind:key="curso">{{curso}}</option>
                </select> 
            </div>
            <button @click='cadastrar()' id="cadastrar">Cadastrar</button>
        </div>
        <div class="infoGrafico">
            <h3>{{subTitulo}}</h3>
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

export default{
    name: "principal",
    data(){
        return{
        logoUnime: '<img width="120" src="https://cmspim.cogna.digital/unime/public/2019-10/logo-unime-p.png" alt="Era pra ser o logo da unime">',
        titulo: "Cadastramento de alunos",
        subTitulo:"Alunos cadastrados por curso",
        cursos: [
            'Sistemas da informação', 'Engenharia da computação','Administração','Direito','Odontologia'
        ],
        alunos:{
          nome: '',
          ra: '',
          curso: '',
        }   
        }
    },
    mounted(){

    },
    methods: {
         cadastrar(){
           if(this.alunos.nome == "" || this.alunos.ra == "" || this.alunos.curso == ""){
               alert("Preencha todos os campos corretamente!")
           }else{
               axios.post('http://170.245.239.157:3000/alunos', this.alunos)
               alert("Aluno cadastrado!")
               this.alunos.nome = '',
               this.alunos.ra = '',
               this.alunos.curso = ''
           }
         }       
    
    }
}
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
  h2{
  color: red;
  font-weight: bold;
  }
  a{
  text-decoration: none;
  color: white;
  }
  #excluir{
  font-size: 13px;
  margin-top: 30px;
  background: red;
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
  }
  input{
    border: 1px solid black;
  }
  .linhaSombreada{
  border: 1px solid black;
  box-shadow: 1px 1px red;
  }
  .cadastramento{
  background-color: white;
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  padding: 30px;
  color: red;
  font-weight: bold;
  }
  #ra{
  width: 90%;
  border: 1px solid black;
  }
  #nome{
  width: 90%;
  border: 1px solid black;
  }
  #curso{
  border: 1px solid black;
  }
  #cadastrar{
  margin-left: 15px;    
  margin-top: 10px;
  width: 80px;
  height: 30px;
  font-size: 15px;
  background-color: red;
  color: white;
  border-radius: 8px;
  }
  .infoGrafico{
  background-color: white;
  margin-top: 25px;
  color: red;
  font-weight: bold;
  padding-top: 20px;
  padding-left: 15px;
  padding-bottom: 100px; /*Alterar quando introduzir grafico*/
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

</style>
