import { useState } from "react";
import data from "../assets/top.json";
import "../assets/styles/Slider.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
console.log(data.top);
const Slider = () => {
  const [topic, setTopic] = useState(data.top);
  const [pagina, setPagina] = useState(0);
  const handleClickNext = () => {
    pagina === topic.length - 1 ? setPagina(0) : setPagina(pagina + 1);
  };
  const handleClicPrev = () => {
    pagina < 1 ? setPagina(topic.length - 1) : setPagina(pagina - 1);
  };
  console.log("renderizando slider");
  return (
    <section className="slider">
      <div className="slider__buttons">
        <span onClick={handleClicPrev}>
          <FaChevronLeft />
        </span>
        <span onClick={handleClickNext}>
          <FaChevronRight />
        </span>
      </div>
      <div className="slider__wrap">
        <img src={topic[pagina].image_url} alt={topic[pagina].title} />
      </div>
      <article className="slider__details">
        <h4>{topic[pagina].title}</h4>
        <p>start day: {topic[pagina].start_date || "Unknown"}</p>
      </article>
      <div className="slider__page">
        <p>
          {pagina + 1}/{topic.length}
        </p>
      </div>
    </section>
  );
};

export default Slider;
