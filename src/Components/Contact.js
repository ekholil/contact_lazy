import React, { useState, useRef, useCallback } from "react";
import useContactSearch from "../Hooks/useContactSearch";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Skeleton } from "@mui/material";

const Contact = ({ setLoggedIn }) => {
  const [results, setResults] = useState(10);

  const { contacts, hasMore, loading, error } = useContactSearch(results);

  const observer = useRef();
  const lastContactElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setResults((prevResult) => prevResult + 10);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleLogOut = () => {
    setLoggedIn(false);
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ padding: "0 30px" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Contacts
            </Typography>
            <Button onClick={handleLogOut} color="inherit">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      {contacts.map((contact, index) => {
        if (contacts.length === index + 1) {
          return (
            <div ref={lastContactElementRef} key={contact.login.uuid}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "0 50px",
                  marginBottom: "5px",
                }}
              >
                <h3>{contact.name.first + " " + contact.name.last}</h3>
                <img
                  style={{ alignSelf: "center", borderRadius: "50%" }}
                  src={contact.picture.thumbnail}
                  alt={contact.name.first}
                />
              </div>
            </div>
          );
        } else {
          return (
            <div key={contact.login.uuid}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "0 50px",
                  marginBottom: "5px",
                }}
              >
                <h3>{contact.name.first + " " + contact.name.last}</h3>
                <img
                  style={{ alignSelf: "center", borderRadius: "50%" }}
                  src={contact.picture.thumbnail}
                  alt={contact.name.first}
                />
              </div>
            </div>
          );
        }
      })}
      {loading && (
        <div style={{ margin: "0 50px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "90%" }}>
              <Skeleton sx={{ height: "70px" }} animation="wave" />
            </div>
            <div>
              <Skeleton
                animation="wave"
                sx={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "90%" }}>
              <Skeleton sx={{ height: "70px" }} animation="wave" />
            </div>
            <div>
              <Skeleton
                animation="wave"
                sx={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "90%" }}>
              <Skeleton sx={{ height: "70px" }} animation="wave" />
            </div>
            <div>
              <Skeleton
                animation="wave"
                sx={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                }}
              />
            </div>
          </div>
        </div>
      )}
      <div>{error && "Error"}</div>
    </div>
  );
};

export default Contact;
