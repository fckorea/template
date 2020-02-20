import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  Home as HomeIcon,
  AttachMoney as AttachMoneyIcon,
  Twitter as TwitterIcon,
  Public as PublicIcon,
  PlayArrow as PlayArrowIcon,
  SettingsEthernet as SettingsEthernetIcon,
  SettingsInputComponent as SettingsInputComponentIcon,
  Timer as TimerIcon,
  Settings as SettingsIcon,
  PhonelinkSetup as PhonelinkSetupIcon
} from '@material-ui/icons';

const categories = [
  {
    id: 'Tools',
    children: [
      { id: 'FXI', icon: <AttachMoneyIcon />, title: '환율계산기', to: '/fxi' },
      // { id: 'TORRENT', icon: <PublicIcon />, title: 'Torrent', to: '/torrent' },
      // { id: 'Functions', icon: <SettingsEthernetIcon /> },
      // { id: 'ML Kit', icon: <SettingsInputComponentIcon /> },
      // { id: 'WebPlayer', icon: <PlayArrowIcon />, title: 'Web Player', to: '/webplayer' },
    ],
  },
  {
    id: 'Develop',
    children: [
      { id: 'TWITTER', icon: <TwitterIcon />, title: '트위터영상', to: '/twitter' },
      // { id: 'Analytics', icon: <SettingsIcon /> },
      // { id: 'Performance', icon: <TimerIcon /> },
      // { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
    ],
  },
];

const styles = theme => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});

function Navigator(props) {
  const { classes, ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          ToolBox
        </ListItem>
        <ListItem button className={clsx(classes.item, classes.itemCategory)} component={NavLink} exact to="/">
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            Home
          </ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, title, to, active }) => (
              <ListItem
                key={childId}
                className={clsx(classes.item, active && classes.itemActiveItem)}
                component={NavLink}
                exact
                to={to ? to:'/'}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {title}
                </ListItemText>
              </ListItem>
            ))}
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
