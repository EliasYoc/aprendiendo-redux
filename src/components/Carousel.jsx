import { v4 } from "uuid";
import CarouselItem from "./CarouselItem";
import "../assets/styles/Carousel.scss";
const Carousel = ({ title, data, isLoading, hasError }) => {
  // console.log("en carousel", data);
  return (
    <section className="wrap">
      <h4>{hasError ? hasError : title}</h4>

      <div className="carousel">
        {isLoading ? (
          <h4>Cargando...</h4>
        ) : (
          data?.articles?.map((item) => <CarouselItem key={v4()} {...item} />)
        )}
      </div>
    </section>
  );
};

export default Carousel;
