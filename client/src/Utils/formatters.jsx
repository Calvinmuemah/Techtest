export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0
  }).format(price);
};
// export const formatDate = (date) => {
//   return new Intl.DateTimeFormat('en-KE', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit'
//   }).format(new Date(date));
// };