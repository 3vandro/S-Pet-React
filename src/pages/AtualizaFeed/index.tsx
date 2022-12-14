import { useEffect, useState } from 'react';
import style from '../Feed/Feed.module.scss'; 
import React from "react";
import { baseURL } from 'api';
import IUser from 'interfaces/IUser';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useParams, useNavigate } from 'react-router-dom';



const validationPost = yup.object().shape({
    title: yup.string().required("O título é obrigatório").max(40, ),
    content: yup.string().required("O conteúdo é obrigatório").max(500, )

})

export default function EditarPost() {
    const{ id} = useParams()
    console.log()
    let navigate = useNavigate()

    
    // falta colocar o id do usuario no caminho
    const addPost = (data: Object) => axios.put(`${baseURL}posts/${id}`, data)
        .then(() => {
        console.log("deu certo")
        navigate("/")
        })
        .catch(() => {
            console.log("deu erro")
        })

   const { register, handleSubmit, formState:{ errors }, reset } = useForm({
    resolver: yupResolver(validationPost)
   })

   useEffect(() => {
    axios.get(`${baseURL}posts/${id}`)
    .then((response) => {
        reset(response.data)
    })
    },[])


        return (
            <>
            <main className='container'>
                <section>
                    <form onSubmit={handleSubmit(addPost)} className={style.formPostagem}>
                        <div>
                            <label htmlFor='titulo'>Título</label>
                            <input type="text" id="titulo" {...register("title")} />
                        </div>
                        <br />
                        <div>
                            <label htmlFor='content'>Conteúdo</label>
                            <textarea  id='conteudo' className={style.inputConteudo} rows={10} {...register("content")} ></textarea>

                        </div>
                        <br />
                        <button type='submit'className={style.largeButton} >Atualizar</button>
                    </form>
                </section>
            </main>
            </>

                    
        )

}


// export default EditarPost


