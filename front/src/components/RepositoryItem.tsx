import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarIcon from "@material-ui/icons/Star";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LinkIcon from "@material-ui/icons/Link";
import moment from "moment-timezone";
import { getRandomColor } from "../helpers/getRandomColor";
import VisibilityIcon from "@material-ui/icons/Visibility";
import BugReportIcon from "@material-ui/icons/BugReport";
import { handleRepositoryStar } from "../api";

export default function RepositoryItem(props: any) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [randomColor] = React.useState(getRandomColor());
  const [isStarred, setIsStarred] = React.useState(props.starred);
  const [starCount, setStarCount] = React.useState(props.stargazers_count);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const lastUpdatedDate = moment(props.updated_at)
    .tz("America/Sao_Paulo")
    .format("DD/MM/YYYY");

  function handleStarChange() {
    handleRepositoryStar(props.full_name).then((success) => {
      if (isStarred) {
        if (starCount >= 1) setStarCount(starCount - 1);
      } else {
        setStarCount(starCount + 1);
      }

      setIsStarred(!isStarred);
    });
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            style={{ backgroundColor: randomColor }}
            aria-label="recipe"
            className={classes.avatar}
          >
            {props.name.substring(0, 2)}
          </Avatar>
        }
        action={
          <a href={props.html_url} target="_blank" aria-label="Link">
            <LinkIcon />
          </a>
        }
        title={props.name}
        subheader={`Atualizado: ${lastUpdatedDate}`}
      />

      <CardActions disableSpacing>
        <IconButton
          onClick={handleStarChange}
          className={classes.wrapperIcon}
          aria-label="Likes"
        >
          {isStarred ? <StarIcon /> : <StarOutlineIcon />}

          <Typography paragraph>{starCount}</Typography>
        </IconButton>
        <IconButton
          style={{ pointerEvents: "none" }}
          className={classes.wrapperIcon}
          aria-label="Watchers"
        >
          <VisibilityIcon />
          <Typography paragraph>{props.watchers_count}</Typography>
        </IconButton>
        <IconButton
          style={{ pointerEvents: "none" }}
          className={classes.wrapperIcon}
          aria-label="Issues"
        >
          <BugReportIcon />
          <Typography paragraph>{props.open_issues_count}</Typography>
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {props.description ? (
            <>
              <Typography className={classes.descriptionTitle} paragraph>
                Descrição:
              </Typography>
              <Typography paragraph>{props.description}</Typography>
            </>
          ) : null}
          <Typography className={classes.descriptionTitle} paragraph>
            Linguagem:
          </Typography>
          <Typography paragraph>{props.language}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 550,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    textTransform: "uppercase",
  },
  wrapperIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionTitle: {
    fontWeight: "bold",
  },
}));
