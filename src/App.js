import './App.css';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material'
import memories from './images/memories.png'
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getPosts } from './features/posts/postSlice';

function App() {
  const { currentId } = useSelector(store => store.posts)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch, currentId])
  // console.log('check App', currentId)

  return (
    <Container maxWidth="lg">
      <AppBar className='App' position="static" color="inherit">
        <Typography variant="h2" align='center'>
          Memories
        </Typography>
        <img src={memories} alt="memories" height='60' />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container spacing={4} gap={5} justify='between' alignItems='stretch' >
            <Grid item xs={12} sm={7} >
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4} marginTop={3.5}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
