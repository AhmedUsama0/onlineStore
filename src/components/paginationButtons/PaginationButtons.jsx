import { Link, useNavigate } from "react-router-dom";
import "./paginationbuttons.css";
import { useEffect, useRef } from "react";
const PaginationButtons = ({ numberOfPages, currentPage }) => {
  const navigate = useNavigate();
  const scrollablePagination = useRef(null);
  const pages = useRef([]);

  const scrollPagination = (direction) => {
    const scroll_item = pages.current[0].parentElement;
    const scrollAmount = scroll_item.clientWidth;
    switch (direction) {
      case "forward":
        scrollablePagination.current.scrollLeft += scrollAmount;
        break;
      case "backward":
        scrollablePagination.current.scrollLeft -= scrollAmount;
        break;
      default:
        scrollablePagination.current.scrollLeft = scrollAmount;
    }
  };
  const handlePagination = (e, direction) => {
    if (numberOfPages === parseInt(currentPage) && direction === "forward") {
      return;
    }
    if (parseInt(currentPage) === 1 && direction === "backward") return;
    const nextPage = getNextPage(direction);
    scrollPagination(direction);
    navigate(`/${nextPage}`);
  };
  const getNextPage = (direction) => {
    let page;
    switch (direction) {
      case "forward":
        page = parseInt(currentPage) + 1;
        break;
      case "backward":
        page = parseInt(currentPage) - 1;
        break;
      default:
        page = parseInt(currentPage);
    }
    return page;
  };
  const handlePageClick = (e) => {
    pages.current.forEach((page) => {
      page.classList.remove("active");
    });
    e.target.classList.add("active");
  };

  useEffect(() => {
    const activePage = pages.current.find((page) => page.id === currentPage);
    activePage.click();
  }, [currentPage]);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <button
            type="button"
            className="page-link border border-success-subtle"
            aria-label="Previous"
            onClick={(e) => handlePagination(e, "backward")}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        <div className="visible-pages d-flex" ref={scrollablePagination}>
          {Array(numberOfPages)
            .fill(1)
            .map((_, index) => {
              return (
                <li
                  className="page-item scroll-item"
                  onClick={handlePageClick}
                  key={index}
                >
                  <Link
                    ref={(page) => (pages.current[index] = page)}
                    id={index + 1}
                    className="page-link page border border-success-subtle"
                    to={`/${index + 1}`}
                  >
                    {index + 1}
                  </Link>
                </li>
              );
            })}
        </div>
        <li className="page-item">
          <button
            type="button"
            className="page-link border border-success-subtle"
            aria-label="Next"
            onClick={(e) => handlePagination(e, "forward")}
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationButtons;
