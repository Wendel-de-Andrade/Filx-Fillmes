import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "./../../services/api";
import "./filme-info.css";
import { toast } from "react-toastify";

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadFilmes() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "9b88409acc876e8783a1eca393413417",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("FILME NÃO ENCONTRADO");
                navigate("/", {replace: true})
                return;
            })
        }    

        loadFilmes();

        return() => {
            console.log("COMPONENTE DESMONTADO")
        }

    }, [id, navigate])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@flixfilmes");
        
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilme){
            toast.warn("Esse filme já está na sua lista!")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@flixfilmes", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!")

    }

    function linkTrailer(){
        window.open(`https://youtube.com/results?search_query=${filme.title} Triler pt-br`);
    }



    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    const numero = parseFloat(filme.vote_average); // Pega os dados de nota no filme e tranforma em Float
    const average = numero.toFixed(1); // Pega os números em Float e arredonda eles
    


    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button onClick={linkTrailer}>Trailer</button>

            </div>

        </div>
    )
}

export default Filme;