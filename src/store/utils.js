export function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") == "true";
}

export function logIn() {
  localStorage.setItem("isLoggedIn", true);
}

export function logOutUtil(){
  localStorage.setItem('isLoggedIn',false);
}