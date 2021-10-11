import "../assets/styles/CarouselItem.scss";

import { BsFillBookmarkFill } from "react-icons/bs";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { saveBookmark, selectBookmarks } from "../features/recomendationsSlice";
const CarouselItem = ({
  idYoc,
  author_name,
  author_url,
  image_url,
  intro,
  title,
  url,
}) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector(selectBookmarks);

  const handleBookmark = () => {
    const alreadyExists = bookmarks.some((item) => item.idYoc === idYoc);
    if (alreadyExists) {
      return;
    }
    const objSaved = {
      idYoc,
      author_name,
      author_url,
      image_url,
      intro,
      title,
      url,
    };
    dispatch(saveBookmark(objSaved));
  };
  console.log("renderiza item");
  return (
    <article className="card">
      <div className="card__image">
        <img
          src={
            image_url
              ? image_url
              : "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg"
          }
          alt={title}
        />
      </div>

      <div className="card__info">
        <div className="info__buttons">
          <span className="info__icon">
            <BsFillBookmarkFill onClick={handleBookmark}></BsFillBookmarkFill>
          </span>
        </div>
        <div className="info__title">
          <h5>
            {`${title} `}
            <a
              className="info__icon"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              <HiOutlineExternalLink></HiOutlineExternalLink>
            </a>
          </h5>
        </div>
        <div className="info__details">
          <a
            className="info__a"
            href={author_url}
            target="_blank"
            rel="noreferrer"
          >
            Autor: {author_name}
          </a>
          <p>{intro}</p>
        </div>
      </div>
    </article>
  );
};

export default CarouselItem;
