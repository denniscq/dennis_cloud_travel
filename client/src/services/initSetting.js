/**
 * @description inital dropdown setting.
*/
export default {
  setupFilter: () => {
    console.log('begin to setup filter configuration');
    return {
      reviewOption: [
        'Excellent',
        'Very Good',
        'Good',
        'Fair',
        'Pool',
        'No Review',
      ],
      starOption: [
        '⭐⭐⭐⭐⭐',
        '⭐⭐⭐⭐',
        '⭐⭐⭐',
        '⭐⭐',
        '⭐',
        'No rating',
      ],
      reservationOption: [
        'Free cancellation',
        'Book now, pay later',
        'Pay at hotel',
      ],
      mealOption: [
        'Room only',
        'Breakfast',
        'Lunch',
        'Dinner',
        'Half board',
        'Full board',
        'All inclusive',
      ],
      propertyOption: [
        'Hotel',
        'Hostel/Backpaker accomodation',
        'Apartment',
        'Aparthotel',
        'Resort',
        'Inn',
        'Motel',
        'Bed & breakfast',
        'Guesthouse',
        'Condo',
        'All-inclusive property',
        'Hostal',
      ],
      facilityOption: [
        'Swimmping pool',
        'Internet access',
        'Non-smoking floor',
        'facility-4',
        'facility-5',
        'facility-6',
        'facility-7',
        'facility-8',
        'facility-9',
        'facility-10',
        'facility-11',
        'facility-12',
        'facility-13',
        'facility-14',
        'facility-15',
        'facility-16',
        'facility-17',
        'facility-18',
        'facility-19',
        'facility-20',
        'facility-21',
        'facility-22',
        'facility-23',
        'facility-24',
        'facility-25',
        'facility-26',
      ]

    };
  },
  setupLanguages: () => ['English', 'China', 'Janpaese'],
  setupCurrency: () => ['USD', 'RMB', 'Dollar'],
};
