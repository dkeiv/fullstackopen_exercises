import { useRef } from 'react';
import BlogForm from './BlogForm';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  clearNoti,
  createNoti,
  useNotificationDispatch,
} from '../../context/slices/notiSlice';

import blogService from '../../services/blogs';

import { Togglable } from '../../components';
import { Link } from 'react-router-dom';

const BlogItem = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  );
};

const BlogList = () => {
  const blogFormRef = useRef();
  const notiDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });

  const newBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: newBlog => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      notiDispatch(createNoti({ content: `added: ${newBlog.title}` }));
      setTimeout(() => {
        notiDispatch(clearNoti());
      }, 3000);
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

  const createBlog = async newBlog => {
    blogFormRef.current.toggleVisibility();
    newBlogMutation.mutate(newBlog);
  };

  if (isLoading) {
    return <p>loading...</p>;
  }

  const blogs = data;

  return (
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs
        .sort((b1, b2) => b2.likes - b1.likes)
        .map(blog => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default BlogList;
