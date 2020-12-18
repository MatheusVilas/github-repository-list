import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles({
  list: {
    width: 320,
    display: "flex",
    justifyCcontent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  fullList: {
    width: "auto",
  },
});

interface DrawerProps {
  drawerIsOpening: boolean;
  closeDrawer: () => void;
  openDrawer: () => void;
}

export default function Drawer({
  drawerIsOpening,
  closeDrawer,
  openDrawer,
}: DrawerProps) {
  const userName = localStorage.getItem("userName");
  const location = localStorage.getItem("location");
  const bio = localStorage.getItem("bio");
  const avatar = localStorage.getItem("avatar");
  const url = localStorage.getItem("url");
  const isLogged = localStorage.getItem("accessToken");

  const textFields = [userName, location, bio];

  const classes = useStyles();
  const [state, setState] = React.useState<{ [key: string]: boolean }>({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: any, open: any) => (event: any) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor: any) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {isLogged ? (
        <>
          <img
            style={{ width: 130, height: 130, borderRadius: 65, marginTop: 40 }}
            src={avatar as string}
            alt="Usuário avatar"
          />
          {textFields.map((field) => (
            <Typography key={field} style={{ marginTop: 10 }} variant="body1">
              {field}
            </Typography>
          ))}
          <Button
            style={{ marginTop: 20 }}
            onClick={() => {
              localStorage.clear();
              window.location.href = window.location.href.replace(
                window.location.search,
                ""
              );
            }}
            variant="contained"
            color="secondary"
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <AccountCircleIcon style={{ fontSize: 130 }} />
          <List>
            <Button
              onClick={() => {
                window.location.href = `${process.env.REACT_APP_API_URL}/login`;
              }}
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </List>{" "}
        </>
      )}
    </div>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor="left"
        open={drawerIsOpening}
        onClose={closeDrawer}
        onOpen={openDrawer}
      >
        {list("left")}
      </SwipeableDrawer>
    </div>
  );
}
