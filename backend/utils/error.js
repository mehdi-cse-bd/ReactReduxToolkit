// এটা try catche এর বাইরে যত error আছে সেগুলোকে represent করে অথবা try catch ছাড়া সব error কে এই  errorHandler এর মাধ্যমে ধরা হয়

export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
