import React, {Component, useState, ChangeEvent, FormEvent, useEffect}from 'react';
import Header from './HeaderRecuperarSenha';
import Footer from './FooterRecuperarSenha';
import styles from '../App.module.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

const RecuperarSenha = () => {

    const [cpf, setCpf] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>();
   

    

    const RecuperarSenha = (e: FormEvent) => {

        e.preventDefault();

        const dados ={
            cpf: cpf,
            email: email,
            senha: senha,
            
            
        }

        axios.post('http://127.0.0.1:8000/api/esqueciSenhaCliente', dados,
        {
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json"
            }

        }).then(function(response){
            if(response.data.success == false){
                console.log("Error");
                console.log(response.data.error);
                alert("erro ao atualizar, olhar o console")
            }
            else{
                console.log(response)
                window.location.href = "/listagemCliente";
            }
            
        }).catch(function(error){
            console.log(error);
        });
    }

    const handleState = (e: ChangeEvent<HTMLInputElement>)=>{
        if(e.target.name === "cpf"){
            setCpf(e.target.value);
        }
        if(e.target.name === "email"){
            setEmail(e.target.value);
        }
        if(e.target.name=== "senha"){
            setSenha(e.target.value);
        }
       
       
    }
    
      


    return(
        <div>                         <nav className=" bg-warning">
        <ul className="nav nav-tabs">
            <li className="nav-item dropdown btn-warning">
                <a className="nav-link dropdown-toggle text-dark" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Listagens</a>
                <ul className="dropdown-menu">
                    <li><Link to={"/ListagemProfissional"} className="dropdown-item" >Listagem Profissional</Link></li>
                    <li><Link to={"/ListagemCliente"} className="dropdown-item">Listagem Cliente</Link></li>
                    <li><Link to={"/ListagemAgenda"} className="dropdown-item">Listagem Agenda</Link></li>


                </ul>
            </li>

            <li className="nav-item dropdown btn-warning">
                <a className="nav-link dropdown-toggle text-dark" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Cadastros</a>
                <ul className="dropdown-menu">
                    <li><Link to={"/CadastroServico"} className="dropdown-item" >Cadastro Serviço</Link></li>
                    <li><Link to={"/cadastroProfissional"} className="dropdown-item">Cadastro Profissional</Link></li>
                    <li><Link to={"/CadastroCliente"} className="dropdown-item">Cadastro Cliente</Link></li>

                </ul>
            </li>



        </ul>

    </nav>
           <Header />
           <main className={styles.main}>
            <div className='container'>
                <div className='card'>
                    <div className='card-body'>
                        <h5 className='card-title'>Recuperar Senha</h5>
                        <form onSubmit={RecuperarSenha} className='row g-3'>
                            
                            <div className='col-6'>
                                <label htmlFor="cpf" className='form-label'>CPF</label>
                                <input type="text" name='cpf' className='form-control' required onChange={handleState} />
                            </div>

                            <div className='col-6'>
                                <label htmlFor="email" className='form-label'>Email</label>
                                <input type="text" name='email' className='form-control' required onChange={handleState} />
                            </div>

                             
                            <div className='col-6'>
                                <label htmlFor="senha" className='form-label'>Senha</label>
                                <input type="password" name='senha' className='form-control' required onChange={handleState}/>
                            </div>

                            
                             <div className='col-12'>
                                    <button type='submit' className=' btn btn-success btn-sm'>Atualizar</button>
                                </div>
                             
                             
                            
                        </form>

                    </div>

                </div>

            </div>

           </main>

           <Footer/>
        </div>
    );
}

export default RecuperarSenha;