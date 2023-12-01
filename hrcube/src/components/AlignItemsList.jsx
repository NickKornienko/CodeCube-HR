import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

export default function AlignItemsList() {
    const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <List sx={{ width: '100%', maxWidth: '90%'}}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography color={colors.primary[500]}>Remi S.</Typography>}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="h5"
                color={colors.primary[500]}
              >
                Applauds Neel D. for their hard work 👏
              </Typography>

            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" sx={{ bgcolor: 'grey' }}/>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography color={colors.primary[500]}>Travis H.</Typography>}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="h5"
                color={colors.primary[500]}
              >
                Applauds Cindy B. for their hard work 👏
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" sx={{ bgcolor: 'grey' }} />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography color={colors.primary[500]}>Cindy Baker</Typography>}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="h5"
                color={colors.primary[500]}
              >
                Applauds John D. for their hard work 👏
              </Typography >
            </React.Fragment>
          }
          
        />
      </ListItem>
      <Divider variant="inset" component="li" sx={{ bgcolor: 'grey' }} />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography color={colors.primary[500]}>Travis H.</Typography>}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="h5"
                color={colors.primary[500]}
              >
                Applauds Mansi V. for their hard work 👏
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" sx={{ bgcolor: 'grey' }} />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography color={colors.primary[500]}>Travis H.</Typography>}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="h5"
                color={colors.primary[500]}
              >
                Applauds Nick K. for their hard work 👏
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" sx={{ bgcolor: 'grey' }} />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography color={colors.primary[500]}>Travis H.</Typography>}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="h5"
                color={colors.primary[500]}
              >
                Applauds Kelly N. for their hard work 👏
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" sx={{ bgcolor: 'grey' }} />
      
    </List>
  );
}