import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import getRepositoriesByName from "../api";
import RepositoryItem from "../components/RepositoryItem";
import Drawer from "./Drawer";
import Header from "./Header";

export default function Home() {
  const classes = useStyles();
  const [repositories, setRepositories] = useState([]);
  const [drawerIsOpening, setDrawerIsOpening] = useState(false);

  useEffect(() => {
    if (repositories.length <= 0) fetchData();
  }, []);

  async function fetchData() {
    const repositories = await getRepositoriesByName("MatheusVilas");
    setRepositories(repositories);
    console.log("REPOSITORIES", repositories);
  }

  function closeDrawer() {
    setDrawerIsOpening(false);
  }

  function openDrawer() {
    setDrawerIsOpening(true);
  }

  return (
    <>
      <Header {...{ openDrawer }} />
      <Drawer {...{ drawerIsOpening, closeDrawer, openDrawer }} />
      <Container maxWidth="md">
        {/* <Typography className={classes.marginTop} align="center" variant="h4">
          Pesquise seu usuário ou faça o{" "}
          <Button onClick={openDrawer} variant="text">
            <Typography align="center" variant="h4">
              login.
            </Typography>
          </Button>
        </Typography> */}
      </Container>

      <Container className={classes.section} maxWidth="md" component="section">
        {repositories.map((repository: any) => (
          <RepositoryItem key={repository.id} {...{ ...repository }} />
        ))}
      </Container>

      <Container className={classes.marginTop}>
        <Typography align="center" paragraph variant="subtitle2">
          Desenvolvido por Matheus Vilas Boas
        </Typography>
      </Container>
    </>
  );
}

const useStyles = makeStyles({
  marginTop: {
    marginTop: 50,
  },
  section: {
    justifyContent: "center",
  },
});
