import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper, } from '@mui/material'
import FileBase from 'react-file-base64'
import './Form.css'

import { useDispatch, useSelector } from 'react-redux'
import { getPosts, createPost, getCurrentId, updatePost } from '../../features/posts/postSlice'

const Form = () => {
    const { currentId, posts } = useSelector(store => store.posts)
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    })
    const post = currentId ? posts.find(p => p._id === currentId) : null
    const dispatch = useDispatch()

    useEffect(() => {
        if (post) setPostData(post)
    }, [post])

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch, currentId])

    // console.log('check postData', postData)          

    const handleSubmit = (e) => {
        e.preventDefault()

        if (currentId) {
            dispatch(updatePost(postData))

        } else {
            dispatch(createPost(postData))
        }

        clear()
    }

    const clear = () => {
        dispatch(getCurrentId(null))
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
        })
    }

    return (
        <Paper className='paper'>
            <form className='form' autoComplete='off' noValidate onSubmit={handleSubmit}>
                <Typography variant="h6" textAlign='center' fontWeight={600}>{currentId ? 'Editing ' : 'Creating '} Memories</Typography>
                <TextField
                    name="creator"
                    label="Creator"
                    variant='outlined'
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}

                />
                <TextField
                    name="title"
                    label="Title"
                    variant='outlined'
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}

                />
                <TextField
                    name="message"
                    label="Message"
                    variant='outlined'
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}

                />
                <TextField
                    name="tags"
                    label="Tags"
                    variant='outlined'
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}

                />
                <div className='fileInput'>
                    <FileBase
                        type='file'
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className='buttonSubmit' variant='contained' color='primary' size='large' type='submit' fullWidth>Submit </Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear </Button>
            </form>
        </Paper>
    )
}

export default Form