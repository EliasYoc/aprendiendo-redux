import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Bookmark from "../components/Bookmark";
import Carousel from "../components/Carousel";
import Slider from "../components/Slider";
import { v4 } from "uuid";
import "../assets/styles/Home.scss";
import {
  getAnimeNews,
  getMangaNews,
  selectAnimeNews,
  selectMangaNews,
  selectRecomendations,
} from "../features/recomendationsSlice";

const initialStateError = {
  errAnimeNews: null,
  errMangaNews: null,
};
const Home = () => {
  const dispatch = useDispatch();
  //me devuelve todos los estados, pero me ocaciona renderizados innecesarios
  // const newsAndReccomend = useSelector(selectRecomendations);
  const animeNews1 = useSelector(selectAnimeNews);
  const mangaNews1 = useSelector(selectMangaNews);
  const [error, setError] = useState(initialStateError);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getAll = async () => {
      try {
        setIsLoading(true);
        const promises = [
          await fetch("https://api.jikan.moe/v3/anime/1/news").then((res) =>
            !res.ok ? res : res.json()
          ),
          await fetch("https://api.jikan.moe/v3/manga/1/news").then((res) =>
            !res.ok ? res : res.json()
          ),
        ];
        // console.log("promises", promises);
        const objPromise = await Promise.allSettled(promises);
        console.log(objPromise);
        // //aprender en documentacion
        const [animeNews, mangaNews] = objPromise.map((obj) => {
          // console.log(obj);
          return obj.status === "fulfilled" ? obj.value : obj.reason.message;
        });
        console.log(animeNews, mangaNews);
        animeNews.articles.forEach((article) => (article.idYoc = v4()));
        mangaNews.articles.forEach((article) => (article.idYoc = v4()));
        setIsLoading(false);
        if (animeNews.ok === false) {
          setError((prevState) => {
            return {
              ...prevState,
              errAnimeNews: `Error ${animeNews.status}: ${
                animeNews.statusText || "Ocurrio un error"
              }`,
            };
          });
        } else {
          dispatch(getAnimeNews(animeNews));
          setError((prevState) => {
            return {
              ...prevState,
              errAnimeNews: null,
            };
          });
        }
        if (mangaNews.ok === false) {
          setError((prevState) => {
            return {
              ...prevState,
              errMangaNews: `Error ${mangaNews.status}: ${
                mangaNews.statusText || "Ocurrio un error"
              }`,
            };
          });
        } else {
          dispatch(getMangaNews(mangaNews));
          setError((prevState) => {
            return { ...prevState, errMangaNews: null };
          });
        }
      } catch (err) {
        console.log("err", err);
      }
    };
    getAll();
  }, [dispatch]);
  return (
    <div>
      <div className="container">
        <Bookmark />
        <Slider />
      </div>

      <Carousel
        hasError={error.errAnimeNews}
        isLoading={isLoading}
        title="Noticias de Anime"
        data={animeNews1}
      />
      <Carousel
        hasError={error.errMangaNews}
        isLoading={isLoading}
        title="Noticias de Manga"
        data={mangaNews1}
      />
    </div>
  );
};

export default Home;
