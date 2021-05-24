export const API_ROOT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:9000' //local server
    : ''; //cloud server link
