/**
 * * @description sort feature (review, star, price, hotelname)
 * * @param {*} filterCondition
 * * @param {*} root
*/
export default {
  filter: (filterCondition, root) => {
    let filledResults = [];
    const filterHotelname = new Set();
    const filterStar = new Set();
    const filterPrice = new Set();
    const filterReview = new Set();
    Object.keys(filterCondition).forEach((key) => {
      try {
        root.results.map((hotel) => {
          switch (key) {
            case 'hotelName': {
              if (hotel.property.name.indexOf(filterCondition[key]) > -1) {
                filterHotelname.add(hotel);
                filledResults.push(hotel);
              }
              break;
            }
            case 'Star rating': {
              filterCondition[key].forEach((star) => {
                if (hotel.property.starRating >= star.length) {
                  filterStar.add(hotel);
                  filledResults.push(hotel);
                }
              });
              break;
            }
            case 'price': {
              if (
                filterCondition[key][0] <= hotel.packages[0].adjustedDisplayRate.value &&
                hotel.packages[0].adjustedDisplayRate.value <= filterCondition[key][1]
              ) {
                filterPrice.add(hotel);
                filledResults.push(hotel);
              }
              break;
            }
            case 'Reviews': {
              if (
                hotel.property.reviews &&
                hotel.property.reviews.summary &&
                filterCondition[key].indexOf(
                  hotel.property.reviews.summary.scoreDescription
                ) > -1
              ) {
                filterReview.add(hotel);
                filledResults.push(hotel);
              }
              break;
            }
            default:
              break;
          }
          return hotel;
        });
      } catch (error) {
        console.log(
          `an error has been occurred while filtering data by condition, details is ${error}`
        );
        throw error;
      }
    });

    if (filterReview.size) {
      filledResults = Array.from(
        new Set([...filledResults].filter((p) => filterReview.has(p)))
      );
    }
    if (filterPrice.size) {
      filledResults = Array.from(
        new Set([...filledResults].filter((p) => filterPrice.has(p)))
      );
    }
    if (filterHotelname.size) {
      filledResults = Array.from(
        new Set([...filledResults].filter((p) => filterHotelname.has(p)))
      );
    }
    if (filterStar.size) {
      filledResults = Array.from(
        new Set([...filledResults].filter((p) => filterStar.has(p)))
      );
    }
    console.log('after filtering', filledResults);
    return filledResults;
  },
};
