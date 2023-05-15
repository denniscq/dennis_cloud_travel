const reviewsCheckList = reactive([
  'Excellent',
  'Very Good',
  'Good',
  'Fair',
  'Pool',
  'No Review',
]);
const starCheckList = reactive([
  '⭐⭐⭐⭐⭐',
  '⭐⭐⭐⭐',
  '⭐⭐⭐',
  '⭐⭐',
  '⭐',
  'No rating',
]);
const reservationCheckList = reactive([
  'Free cancellation',
  'Book now, pay later',
  'Pay at hotel',
]);
const mealCheckList = reactive([
  'Room only',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Half board',
  'Full board',
  'All inclusive',
]);
const propertyCheckList = reactive([
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
]);
const facilityCheckList = reactive([
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
]);

export const initDropdownSetting = (reactive) => {
  return [
    reviewsCheckList,
    starCheckList,
    reservationCheckList,
    mealCheckList,
    propertyCheckList,
    facilityCheckList,
  ]
}
