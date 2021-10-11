import { useSelector } from "react-redux";
import { selectBookmarks } from "../features/recomendationsSlice";
import "../assets/styles/Bookmark.scss";
const Bookmark = () => {
  const bookmarks = useSelector(selectBookmarks);
  // console.log(bookmarks);
  if (bookmarks.length === 0) return null;
  return (
    <section className="scroll">
      <div className="bookmarks">
        {bookmarks.map((saved) => (
          <article key={saved.idYoc} className="bookmark__item">
            <div className="bookmark__container">
              <img src={saved.image_url} alt="" />
            </div>
            <div className="bookmark__info">
              <a href={saved.url} target="_blank" rel="noreferrer noopener">
                {saved.title}
              </a>
              <a
                href={saved.author_url}
                target="_blank"
                rel="noreferrer noopener"
              >
                {saved.author_name}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Bookmark;
