/**
     * @description sort feature.
     * 5. sort popular
     * 6. sort price
     * 7. sort reviews count
     * 8. sort Discount
     */
export default {
  sort: (sortCondition, sourceData) => {
    const filledResults = [];
    const zeorList = [];
    switch (sortCondition) {
      case 'isPopular': {
        sourceData.results.map((hotel) => {
          if (
            hotel.property.reviews &&
            hotel.property.reviews.summary &&
            hotel.property.reviews.summary.popularity
          ) {
            filledResults.push(hotel);
          } else {
            zeorList.push(hotel);
          }
          return hotel;
        });

        let tempOne = {};
        for (let i = 0; i < filledResults.length - 1; i++) {
          for (let j = 0; j < filledResults.length - 1 - i; j++) {
            if (
              filledResults[j].property.reviews.summary.popularity <
              filledResults[j + 1].property.reviews.summary.popularity
            ) {
              tempOne = filledResults[j + 1];
              filledResults[j + 1] = filledResults[j];
              filledResults[j] = tempOne;
            }
          }
          console.log(filledResults[i].property.reviews.summary.popularity);
        }

        filledResults.push(...zeorList);
        break;
      }
      case 'isPrice': {
        sourceData.results.map((hotel) => {
          if (
            hotel.packages &&
            hotel.packages.length &&
            hotel.packages[0].adjustedDisplayRate &&
            hotel.packages[0].adjustedDisplayRate.value
          ) {
            filledResults.push(hotel);
          } else {
            zeorList.push(hotel);
          }
          return hotel;
        });

        let tempOne = {};
        for (let i = 0; i < filledResults.length - 1; i++) {
          for (let j = 0; j < filledResults.length - 1 - i; j++) {
            if (
              filledResults[j].packages[0].adjustedDisplayRate.value >
              filledResults[j + 1].packages[0].adjustedDisplayRate.value
            ) {
              tempOne = filledResults[j + 1];
              filledResults[j + 1] = filledResults[j];
              filledResults[j] = tempOne;
            }
          }
          console.log(filledResults[i].packages[0].adjustedDisplayRate.value);
        }

        filledResults.push(...zeorList);
        break;
      }
      case 'isReview': {
        sourceData.results.map((hotel) => {
          if (
            hotel.property &&
            hotel.property.trustYou &&
            hotel.property.trustYou.reviewsCount
          ) {
            filledResults.push(hotel);
          } else {
            zeorList.push(hotel);
          }
          return hotel;
        });

        let tempOne = {};
        for (let i = 0; i < filledResults.length - 1; i++) {
          for (let j = 0; j < filledResults.length - 1 - i; j++) {
            if (
              filledResults[j].property.trustYou.reviewsCount <
              filledResults[j + 1].property.trustYou.reviewsCount
            ) {
              tempOne = filledResults[j + 1];
              filledResults[j + 1] = filledResults[j];
              filledResults[j] = tempOne;
            }
          }
          console.log(filledResults[i].property.trustYou.reviewsCount);
        }

        filledResults.push(...zeorList);
        break;
      }
      case 'isDiscount':
        {
          sourceData.results.map((hotel) => {
            if (
              hotel.packages &&
              hotel.packages.length &&
              hotel.packages[0].adjustedDisplayRate &&
              hotel.packages[0].adjustedDisplayRate.value
            ) {
              filledResults.push(hotel);
            } else {
              zeorList.push(hotel);
            }
            return hotel;
          });

          let tempOne = {};
          for (let i = 0; i < filledResults.length - 1; i++) {
            for (let j = 0; j < filledResults.length - 1 - i; j++) {
              const rate = ((filledResults[j].packages[0].displayRate.value
                - filledResults[j].packages[0].adjustedDisplayRate.value)
                / filledResults[j].packages[0].displayRate.value).toFixed(2) * 100;
              const rateNext = ((filledResults[j + 1].packages[0].displayRate.value
                - filledResults[j + 1].packages[0].adjustedDisplayRate.value)
                / filledResults[j + 1].packages[0].displayRate.value).toFixed(2) * 100;

              if (rate < rateNext) {
                tempOne = filledResults[j + 1];
                filledResults[j + 1] = filledResults[j];
                filledResults[j] = tempOne;
              }
            }
            console.log('sequence', i);
            console.log(filledResults[i].packages[0].displayRate.value);
            console.log(filledResults[i].packages[0].adjustedDisplayRate.value);
          }

          filledResults.push(...zeorList);
          break;
        }
      default:
        break;
    }

    console.log('after filtering', filledResults);
    return filledResults;
  }
};
