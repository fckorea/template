import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  AttachMoney as AttachMoneyIcon,
  Twitter as TwitterIcon,
  Public as PublicIcon,
  PlayArrow as PlayArrowIcon,
} from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
  breadcrumb: {
    color: lightColor,
  },
  toolbar: {
    margin: '10px 0px',
  }
});

const routePathInfo = {
  '/': {
    path: 'Home',
    icon: <HomeIcon />
  },
  '/fxi': {
    path: '환율계산기',
    icon: <AttachMoneyIcon />
  },
  '/twitter': {
    path: '트위터영상',
    icon: <TwitterIcon />
  },
  '/torrent': {
    path: 'Torrent',
    icon: <PublicIcon />
  },
  '/webplayer': {
    path: '웹 플레이어',
    icon: <PlayArrowIcon />
  }
}

function Header(props) {
  const { classes, onDrawerToggle } = props;

  return (
    <React.Fragment>
      <Hidden smUp>
        <AppBar color="primary" position="sticky" elevation={0}>
          <Toolbar className={classes.toolbar}>
            <Grid container direction="column">
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item xs>
                <Typography color="inherit" variant="h5" component="h1">
                {routePathInfo[props.location.pathname] ? routePathInfo[props.location.pathname].icon:''} {routePathInfo[props.location.pathname] ? routePathInfo[props.location.pathname].path:':('}
                </Typography>
              </Grid>
              {/* <Grid item>
                <Link className={classes.link} href="#" variant="body2">
                  Go to docs
                </Link>
              </Grid>
              <Grid item>
                <Tooltip title="Alerts • No alerts">
                  <IconButton color="inherit">
                    <NotificationsIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <IconButton color="inherit" className={classes.iconButtonAvatar}>
                  <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
                </IconButton>
              </Grid> */}
            </Grid>
          </Toolbar>
        </AppBar>
      </Hidden>
      <Hidden xsDown>
        <AppBar
          color="primary"
          elevation={0}
          // position="sticky"
          position="static"
        >
          <Toolbar className={classes.toolbar}>
            <Grid container direction="column" spacing={1}>
              <Grid item xs>
                <Typography color="inherit" variant="h5" component="h1">
                {routePathInfo[props.location.pathname] ? routePathInfo[props.location.pathname].icon:''} {routePathInfo[props.location.pathname] ? routePathInfo[props.location.pathname].path:':('}
                </Typography>
              </Grid>
              {/* <Grid item>
                <Button className={classes.button} variant="outlined" color="inherit" size="small">
                  Web setup
                </Button>
              </Grid>
              <Grid item>
                <Tooltip title="Help">
                  <IconButton color="inherit">
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </Grid> */}
              <Grid item xs>
                {/* <Breadcrumbs className={classes.breadcrumb} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                  <Link color="inherit" href="/">
                    Material-UI
                  </Link>
                  <Link color="inherit" href="/getting-started/installation/">
                    Core
                  </Link>
                  <Typography>Breadcrumb</Typography>
                </Breadcrumbs> */}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Hidden>
      {/* <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs value={0} textColor="inherit">
          <Tab textColor="inherit" label="Users" />
          <Tab textColor="inherit" label="Sign-in method" />
          <Tab textColor="inherit" label="Templates" />
          <Tab textColor="inherit" label="Usage" />
        </Tabs>
      </AppBar> */}
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withRouter(withStyles(styles)(Header));
