import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Contact from "./Contact";
const Home = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName === "foo" && password === "bar") {
      setLoggedIn(true);
      navigate("/home");
    }
    console.log(userName, password);
  };
  return (
    <div>
      {loggedIn ? (
        <Contact setLoggedIn={setLoggedIn} />
      ) : (
        <div style={{ maxWidth: "500px", margin: "10px auto" }}>
          <h2 style={{ textAlign: "center" }}>Contact App</h2>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                maxWidth: "100%",
              }}
            >
              <TextField
                sx={{ marginBottom: "10px" }}
                onChange={(e) => setUserName(e.target.value)}
                fullWidth
                label="Enter username foo"
                id="fullWidth"
              />
              <TextField
                sx={{ marginBottom: "10px" }}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                label="Enter password bar"
                id="fullWidth"
              />
            </Box>

            <Button size="medium" variant="contained" type="submit" fullWidth>
              Log In
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
