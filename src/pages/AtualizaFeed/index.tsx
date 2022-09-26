import { ChangeEvent, useEffect, useRef, useState } from 'react';
import style from '../Feed/Feed.module.scss';
import classNames from 'classnames';
import posts from 'data/posts';
import moment from 'moment';
import xis from 'assets/imagens/x-mark-16.png';
import http from 'api';
import { useParams } from 'react-router-dom';
import IPost from 'interfaces/IPost';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


import axios from "axios";
import React from "react";
import { baseURL } from 'api';


export default function EditarPost(_id: string) {
  const [post, setPost] = useState(_id);

  useEffect(() => {
    axios.get(`${baseURL}posts/${_id}`)
    .then((response) => {
      setPost(response.data.title)
      console.log(response.data)
    });
  }, []);

  function updatePost() {
    axios
      .put(`${baseURL}posts/${_id}`, {
        
      })
      .then((response) => {
        setPost(response.data);
      });
      console.log(_id)
  }

  if (!post) return "No post!"



    return(
        <main className='container'>
            <section>
                <form  className={style.formPostagem}>
                    <div>
                        <label htmlFor='titulo'>Título</label>
                        <input type="text" name="titulo" id="titulo"/>
                    </div>
                    <br />
                    <div>
                        <label htmlFor='content'>Conteúdo</label>
                        <textarea name='content' id='content' className={style.inputConteudo} rows={10}  
                            
                        ></textarea>

                    </div>
                    <br />
                    
                    {/* <div className={style.previewList}>
                        <div><h1>TESTE</h1></div>
                        {prevImg.length !== 0 && prevImg.map((img, index) => (
                            <div className={style.previewList__preview} key={index}>
                                <img src={img} className={style.previewList__preview__prevImg} alt="" />
                                <button onClick={() => setPrevImg(prevList => [...prevList.slice(0, index), ...prevList.slice(index + 1)])}>
                                    <img src={xis} className={style.previewList__preview__xis} alt="" />
                                </button>
                            </div>
                        ))}
                    </div> */}
                    <br />
                    <button type='submit' onClick={updatePost} className={style.largeButton} >Publicar</button>
                </form>
            </section>
        </main>

    )


    }
    

// export default EditarPost


