import React, {Component, useState, ChangeEvent, FormEvent, useEffect} from "react";

import styles from "../App.module.css"
import Header from "./HeaderCliente";
import Footer from "./FooterCliente";
import { useParams } from "react-router-dom";
import axios from "axios";


const EditarCliente = () =>{

    const [nome, setNome] = useState<string>("");
    const [celular, setCelular] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [dataNascimento, setDataNascimento] = useState<string>("");
    const [cidade, setCidade] = useState<string>("");
    const [estado, setEstado] = useState<string>("");
    const [pais, setPais] = useState<string>("");
    const [rua, setRua] = useState<string>("");
    const [numero, setNumero] = useState<string>("");
    const [bairro, setBairro] = useState<string>("");
    const [cep, setCep] = useState<string>("");
    const [complemento, setComplemento] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    const parametro = useParams();

    const Atualizar = (e: FormEvent) => {
        e.preventDefault();
        
        const dados ={
            nome: nome,
            celular: celular,
            email: email,
            cpf: cpf,
            dataNascimento: dataNascimento,
            cidade: cidade,
            estado: estado,
            pais: pais,
            rua: rua,
            numero: numero,
            bairro: bairro,
            cep: cep,
            complemento: complemento,
            senha: senha,
            
        }

        axios.put("http://10.137.9.134:8000/api/atualizarProfissional", dados,
        {
            headers: {
                "Accept": "application/json",
                "Content-Type":"application/json"
            }
        }).then(function(response){
            window.location.href = "/listagem";
         }).catch(function(error){
            console.log('Ocorreu um erro ao atualizar');
         });
      

    }

    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await axios.get("http://10.137.9.134:8000/api/find/"+parametro.id)
                setNome(response.data.data.nome);
                setEmail(response.data.data.email);
                setCpf(response.data.data.cpf);
                setId(response.data.data.id);
            }catch(error){
                console.log("erro ao buscar dados da api");

            }
        }
        fetchData();

    }, []);
    
    
    const handleState = (e: ChangeEvent<HTMLInputElement>)=>{
        if(e.target.name === "nome"){
            setNome(e.target.value);
        }
        if(e.target.name === "cpf"){
            setCpf(e.target.value);
        }
        if(e.target.name === "email"){
            setEmail(e.target.value);
        }
      
    }
    return (
        <div>
        <Header />
           <main className={styles.main}>
            <div className='container'>
                <div className='card'>
                    <div className='card-body'>
                        <h5 className='card-title'>Cadastrar Cliente</h5>
                        <form onSubmit={Atualizar} className='row g-3'>
                            
                            <div className='col-6'>
                                <label htmlFor="nome" className='form-label'>Nome</label>
                                <input type="text" name='nome' className='form-control' required onChange={handleState} value={nome} />
                            </div>

                            <div className='col-6'>
                                <label htmlFor="email" className='form-label'>E-mail</label>
                                <input type="text" name='email' className='form-control' required onChange={handleState} value={email}/>
                            </div>

                             
                            <div className='col-6'>
                                <label htmlFor="cpf" className='form-label'>CPF</label>
                                <input type="text" name='cpf' className='form-control' required onChange={handleState} value={cpf}/>
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
    )
}

export default EditarCliente;