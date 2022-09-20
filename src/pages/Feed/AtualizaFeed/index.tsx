import { ChangeEvent, useEffect, useRef, useState } from 'react';
import style from '../Feed.module.scss';
import classNames from 'classnames';
import posts from 'data/posts';
import moment from 'moment';
import xis from 'assets/imagens/x-mark-16.png';
import http from 'api';
import { useParams } from 'react-router-dom';
import IPost from 'interfaces/IPost';
import { Carousel } from 'react-bootstrap';
import DropdownEdit from 'components/Dropdown';


export default function EditarPost(){
    return(
        <main className='container'>
            <section>
                <form  className={style.formPostagem}>
                    <div>
                        <label htmlFor='titulo'>Título</label>
                        <input type="text" id='titulo' placeholder='Escreva o título da postagem' 
                            />
                    </div>
                    <br />
                    <div>
                        <label htmlFor='conteudo'>Conteúdo</label>
                        <textarea name='conteudo' id='conteudo' className={style.inputConteudo} rows={10} placeholder="Escreva o conteúdo da postagem" 
                            
                        ></textarea>
                    </div>
                    <br />
                    <div><button type='button' >Inserir imagem</button>
                        <input
                            type="file"
                            accept="image/*"
                            // onChange=
                            // ref=
                            // multiple
                        />
                    </div>
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
                    <button type='submit' className={style.largeButton} >Publicar</button>
                </form>
            </section>
        </main>

    )

}

      



