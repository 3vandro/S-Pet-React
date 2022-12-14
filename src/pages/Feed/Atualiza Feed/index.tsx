import { ChangeEvent, useEffect, useRef, useState } from 'react';
import style from './Feed.module.scss';
import classNames from 'classnames';
import posts from 'data/posts';
import moment from 'moment';
import xis from 'assets/imagens/x-mark-16.png';
import http from 'api';
import { useParams } from 'react-router-dom';
import IPost from 'interfaces/IPost';
import { Carousel } from 'react-bootstrap';
// import DropdownEdit from 'components/Dropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
// import style from './DropdownEdit.module.scss';

const AtualizaFeed = () => {
    const params = useParams();
    const [inativo, setInativo] = useState(false);
    const [prevImg, setPrevImg] = useState<string[]>([]);
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [feed, setFeed] = useState<IPost[]>([]);

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
    }

    useEffect(() => {
        http.get('posts/')
            .then(res => {
                setFeed(res.data)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        console.log(prevImg)
    }, [prevImg])

    const handleChange = (file: ChangeEvent<HTMLInputElement>) => {
        const input = file.currentTarget;
        if (input.files) {
            let inputFiles = input.files;
            let newArr = Array.from(inputFiles);

            newArr.forEach(img => {
                var reader = new FileReader();
                reader.readAsDataURL(img);
                reader.onload = function () {
                    const dataURL = reader.result;
                    const stringURL = String(dataURL);
                    setPrevImg(prevState => [...prevState, stringURL]);
                };
            })
        }
    };

    const primeirosTrinta = feed.slice(0, 30)

    const inputFile = useRef<HTMLInputElement | null>(null);

    const pegarImagem = () => {
        if (inputFile.current) {
            inputFile.current.click();
        }
    };

    const publicar = () => {
        if (conteudo !== '' || prevImg.length) {

            http.post('posts/', {
                date: new Date(),
                userId: params.id,
                title: titulo,
                image: prevImg,
                content: conteudo
            })
                .then(() => {
                    alert('Conte??do publicado com sucesso!')
                    setInativo(!inativo)
                    http.get('posts/')
                        .then(res => {
                            setFeed(res.data)
                        })
                        .catch(error => console.log(error))
                    setTitulo('')
                    setConteudo('')
                    setPrevImg([])
                }
                )
                .catch(error => console.log(error))
        } else {
            alert('A publica????o precisa ter um texto ou uma imagem.')
        }
    }

    // ATUALIZAR POST
    const updatePost = () => {
        if (conteudo !== '' || prevImg.length) {

            http.patch('posts/', {
                date: new Date(),
                userId: params.id,
                title: titulo,
                image: prevImg,
                content: conteudo
            })
                .then(() => {
                    alert('Conte??do atrualizado com sucesso!')
                    setInativo(!inativo)
                    http.get('posts/')
                        .then(res => {
                            setFeed(res.data)
                        })
                        .catch(error => console.log(error))
                    setTitulo('')
                    setConteudo('')
                    setPrevImg([])
                }
                )
                .catch(error => console.log(error))
        } else {
            alert('A publica????o precisa ter um texto ou uma imagem.')
        }
       
    }



    return (
        <main className='container'>
            <button onClick={() => setInativo(!inativo)} className={classNames({
                [style.largeButton]: true,
                [style.inativo]: inativo ? true : false
            })}>
                Poste sobre seu pet
            </button>
            <section className={inativo ? '' : style.inativo}>
                <form onSubmit={aoSubmeterForm} className={style.formPostagem}>
                    <div>
                        <label htmlFor='titulo'>T??tulo</label>
                        <input type="text" id='titulo' placeholder='Escreva o t??tulo da postagem' value={titulo}
                            onChange={evento => setTitulo(evento.target.value)} />
                    </div>
                    <br />
                    <div>
                        <label htmlFor='conteudo'>Conte??do</label>
                        <textarea name='conteudo' id='conteudo' className={style.inputConteudo} rows={10} placeholder="Escreva o conte??do da postagem" value={conteudo}
                            onChange={evento => setConteudo(evento.target.value)}
                        ></textarea>
                    </div>
                    <br />
                    <div><button type='button' onClick={pegarImagem}>Inserir imagem</button>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                            ref={inputFile}
                            multiple
                        />
                    </div>
                    <div className={style.previewList}>
                        {prevImg.length !== 0 && prevImg.map((img, index) => (
                            <div className={style.previewList__preview} key={index}>
                                <img src={img} className={style.previewList__preview__prevImg} alt="" />
                                <button onClick={() => setPrevImg(prevList => [...prevList.slice(0, index), ...prevList.slice(index + 1)])}>
                                    <img src={xis} className={style.previewList__preview__xis} alt="" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <br />
                    <button type='submit' className={style.largeButton} onClick={publicar}>Publicar</button>
                </form>
            </section>
            <section className={style.postagens}>
                {primeirosTrinta.reverse().map((post, index) => (
                    <div key={index} className={style.postagens__postagem}>
                    {/* BOT??O EDITAR E EXCLUIR  */}
                        <div className='dropdown'>
                            <DropdownButton variant= 'Warning' className={style.dropdownEdit} title="">
                            <Dropdown.Item as="button"  onClick={updatePost}>Editar</Dropdown.Item>
                            <Dropdown.Item as="button">Excluir</Dropdown.Item>
                            </DropdownButton>
                            </div> 
                        <p>{moment(post.date).format('lll')}</p>
                        {post.title && <h2>{post.title}</h2>}
                        {post.image.length > 1 ?
                            <Carousel variant="dark" indicators={false} interval={3000000}>
                                {post.image.map((imagem, index) => (
                                    <Carousel.Item key={index}>
                                        <div><img src={imagem} alt="" className='img-fluid' /></div>
                                    </Carousel.Item>
                                ))}
                            </Carousel> :
                            <div className={style.singleImg}><img src={post.image[0]} alt="" className='img-fluid' /></div>
                        }
                        {post.content && <p>{post.content}</p>}
                    </div>
                ))}
            </section>
        </main>


    )
}


export default AtualizaFeed