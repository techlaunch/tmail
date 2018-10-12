import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Typography from '@material-ui/core/Typography';

import moment from 'moment';

import fakeEmails from './fake-emails';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    padding: 0
  }
});

function EmailList(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {
          fakeEmails.map(email => (
            <ListItem key={email._id} button style={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}>
              <div style={{
                display: 'flex',
                minWidth: '250px',
                marginRight: '20px'
              }}>
                <Avatar>
                  <ImageIcon />
                </Avatar>
                <ListItemText primary={email.sender.email} secondary={moment(email.date).format('MM/DD/YYYY hh:mm A')} />
              </div>
              
              <div style={{
                display: 'flex',
              }}>
                <Typography noWrap style={{
                  maxWidth: '500px'
                }}>
                  {email.message}
                </Typography>
              </div>
            </ListItem>
          ))
        }
      </List>
    </div>
  );
}

EmailList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmailList);