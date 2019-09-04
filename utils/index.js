import fetch from "isomorphic-unfetch";

const doLogin = async ({ email, password }) => {
  try {
    const raw = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    const parsed = await raw.json();
    if (!parsed.error) return { passed: true };
    return { passed: false, error: parsed.error };
  } catch (error) {
    console.log("TCL: doLogin -> error", error);
  }
};
const fetchListings = async () => {
  try {
    const raw = await fetch("https://api.myjson.com/bins/10aaj2");
    return await raw.json();
  } catch (error) {
    console.log("TCL: fetchListings -> error", error);
  }
};

export default {
  doLogin,
  fetchListings
};
