import React from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux'
import { CircularProgress, Grid } from '@mui/material'


const Posts = () => {

    const { posts } = useSelector(store => store.posts)

    return (
        !posts?.length ? <CircularProgress /> :
            <Grid className='container' container alignItems='stretch' spacing={6} margin={0}>
                {posts.map(((post, index) => (
                    <Grid key={index} item xs={12} sm={6}>
                        <Post post={post} key={post._id} />
                    </Grid>
                )))}
            </Grid>
    )
}

export default Posts