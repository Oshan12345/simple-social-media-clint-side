export const handleAuthInfo = (endPoint, givenMethod, requiredInfo) => {
  return fetch(endPoint, {
    method: givenMethod,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requiredInfo),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("login data", data);

      return data;
    })
    .catch((err) => console.log(err));
};
