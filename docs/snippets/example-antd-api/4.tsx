const login = (email: string, password: string) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "pass") {
        resolve({ token: "123" });
      } else {
        reject("Invalid username or password");
      }
    }, 1000);
  });
