import { Fragment } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage';
import CreateCarPage from './pages/CreateCarPage';
import { AppBar, CssBaseline, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import EditCarPage from './pages/EditCarPage';
import NotFoundPage from './pages/NotFoundPage';

const useStyles = makeStyles(theme=> ({
  root: {
    display: 'flex'
  },
  content: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#f0f2f5'
  }
}));

function App() {
  const classes = useStyles();
  return (
    <CssBaseline>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent:'flex-start', alignItems: 'flex-start'}}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
            >
              <Menu />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit">
              Car Management System
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <Router>
            <Switch>
              <Route path="/cars/create" component={CreateCarPage}/>
              <Route path="/cars/:id/edit" component={EditCarPage}/>
              <Route path="/cars" component={HomePage} />
              <Route exact path="/" component={HomePage} />
              <Route component={NotFoundPage}/>
            </Switch>
          </Router>
        </div>
      </div>
    </CssBaseline>
  );
}

export default App;
