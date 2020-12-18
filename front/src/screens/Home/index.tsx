import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import getRepositoriesByName from "../../api";
import RepositoryItem from "../../components/RepositoryItem";
import Drawer from "./Drawer";
import Header from "./Header";
import { Alert, AlertTitle } from "@material-ui/lab";
import UrlParams from "../../components/UrlParams";

export function Home() {
  const classes = useStyles();
  const [repositories, setRepositories] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [drawerIsOpening, setDrawerIsOpening] = useState(false);
  const isLogged = localStorage.getItem("accessToken");

  const fetchData = useCallback(() => {
    if (search === "") {
      return setRepositories([]);
    }

    getRepositoriesByName(search)
      .then((repositories) => setRepositories(repositories.data))
      .catch(() => {
        setError(true);
      });
  }, [search]);

  function closeDrawer() {
    setDrawerIsOpening(false);
  }

  function openDrawer() {
    setDrawerIsOpening(true);
  }

  return (
    <UrlParams>
      <Header
        searchOnChange={setSearch}
        searchValue={search}
        {...{ openDrawer }}
        handleSubmit={fetchData}
      />
      <Drawer {...{ drawerIsOpening, closeDrawer, openDrawer }} />

      {repositories && repositories.length >= 1 ? (
        <Container
          className={classes.section}
          maxWidth="md"
          component="section"
        >
          {repositories.map((repository: any) => (
            <RepositoryItem key={repository.id} {...{ ...repository }} />
          ))}
        </Container>
      ) : (
        <Container maxWidth="md">
          {error ? (
            <Alert
              onClose={() => {
                setError(false);
              }}
              style={{ position: "absolute", right: 0 }}
              severity="error"
            >
              <AlertTitle>Error</AlertTitle>
              Nenhum <strong>perfil</strong> encontrado
            </Alert>
          ) : null}

          <Typography className={classes.marginTop} align="center" variant="h4">
            Pesquise o usuário desejado.
            {isLogged ? null : (
              <Button onClick={openDrawer} variant="text">
                <Typography align="center" variant="h4">
                  Faça login.
                </Typography>
              </Button>
            )}
          </Typography>
        </Container>
      )}

      <Container className={classes.marginTop}>
        <Typography align="center" paragraph variant="subtitle2">
          Desenvolvido por Matheus Vilas Boas
        </Typography>
      </Container>
    </UrlParams>
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
