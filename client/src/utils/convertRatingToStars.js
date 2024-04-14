const convertRatingToStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    let stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i className="fa-solid fa-star" key={`full ${i}`}></i>);
    }

    if (hasHalfStar) {
      stars.push(<i className="fa-solid fa-star-half-stroke" key="half"></i>);
    }

    if (stars.length < 5) {
      const empty = 5 - stars.length;
      for (let i = 0; i < empty; i++) {
        stars.push(<i className="fa-regular fa-star" key={`empty${i}`}></i>);
      }
    }
    return <>{stars}</>;
  };

  export default convertRatingToStars;