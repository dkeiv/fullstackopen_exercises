import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import {
  clearNoti,
  createNoti,
  useNotificationDispatch,
} from '../../context/slices/notiSlice';
import blogService from '../../services/blogs';
import { useAuthValue } from '../../context/slices/authSlice';
import { useState } from 'react';
import CommentForm from './CommentForm';

const Blog = () => {
  const auth = useAuthValue();
  const { blogID } = useParams();
  const navigate = useNavigate();
  const notiDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const [blog, setBlog] = useState(
    queryClient.getQueryData(['blogs']).find(blog => blog.id === blogID)
  );

  const removeBlogMutation = useMutation({
    mutationFn: blogService.removeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      notiDispatch(createNoti({ content: 'delete ok!' }));
      setTimeout(() => {
        notiDispatch(clearNoti());
      }, 3000);
      navigate('/');
    },

    onError: err => {
      notiDispatch(
        createNoti({ content: `${err.response?.data.message}`, error: true })
      );
      setTimeout(() => {
        notiDispatch(clearNoti());
      }, 3000);
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setBlog(res);
    },
    onError: err => {
      notiDispatch(
        createNoti({ content: `${err.response?.data.message}`, error: true })
      );
      setTimeout(() => {
        notiDispatch(clearNoti());
      }, 3000);
    },
  });

  const removeBlog = async id => {
    removeBlogMutation.mutate(id);
  };

  const updateBlog = async updateBlog => {
    updateBlogMutation.mutate(updateBlog);
  };

  const handleLike = async e => {
    e.preventDefault();
    updateBlog({ ...blog, likes: blog.likes + 1 });
  };

  const handleRemove = e => {
    e.preventDefault();
    if (window.confirm(`Remove: ${blog.title} (by ${blog.author})`)) {
      removeBlog(blog.id);
    }
  };

  const handleAddComment = async content => {
    const res = await blogService.addComment(blog.id, content);
    setBlog(res);
  };

  return (
    <div>
      <h2>
        {blog.title} (by {blog.author})
      </h2>
      <a href={blog.url} target='_blank' rel='noopener noreferrer'>
        {blog.url}
      </a>
      <p>
        <span> likes: {blog.likes} </span>
        <button onClick={e => handleLike(e)}>
          <i className='nf nf-fa-thumbs_up'></i>
        </button>
      </p>
      <p>added by: {blog.user.name}</p>
      {blog.user.username === auth.username && (
        <button onClick={e => handleRemove(e)}>
          remove <i className='nf nf-fa-trash_can'></i>
        </button>
      )}

      <h3>comments</h3>
      <CommentForm handleAddComment={handleAddComment} />
      {blog.comments.length > 0 ? (
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      ) : (
        <p>no comment</p>
      )}
    </div>
  );
};

export default Blog;
