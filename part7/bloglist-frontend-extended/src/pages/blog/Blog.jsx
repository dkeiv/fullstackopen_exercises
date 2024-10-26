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
import { HandThumbUpIcon, TrashIcon } from '@heroicons/react/24/outline';

const Blog = () => {
  const auth = useAuthValue();
  const { blogID } = useParams();
  const navigate = useNavigate();
  const notiDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const [blog, setBlog] = useState(
    queryClient.getQueryData(['blogs']).find((blog) => blog.id === blogID),
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

    onError: (err) => {
      notiDispatch(
        createNoti({ content: `${err.response?.data.message}`, error: true }),
      );
      setTimeout(() => {
        notiDispatch(clearNoti());
      }, 3000);
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setBlog(res);
    },
    onError: (err) => {
      notiDispatch(
        createNoti({ content: `${err.response?.data.message}`, error: true }),
      );
      setTimeout(() => {
        notiDispatch(clearNoti());
      }, 3000);
    },
  });

  const removeBlog = async (id) => {
    removeBlogMutation.mutate(id);
  };

  const updateBlog = async (updateBlog) => {
    updateBlogMutation.mutate(updateBlog);
  };

  const handleLike = async (e) => {
    e.preventDefault();
    updateBlog({ ...blog, likes: blog.likes + 1 });
  };

  const handleRemove = (e) => {
    e.preventDefault();
    if (window.confirm(`Remove: ${blog.title} (by ${blog.author})`)) {
      removeBlog(blog.id);
    }
  };

  const handleAddComment = async (content) => {
    const res = await blogService.addComment(blog.id, content);
    setBlog(res);
  };

  return (
    <div className='container mx-auto w-full items-center overflow-auto bg-red-300 text-center'>
      <h2 className='my-2 font-semibold'>
        {blog.title} (by {blog.author})
      </h2>
      <div>
        <a
          className='font-medium text-blue-600 underline hover:no-underline dark:text-blue-500'
          href={blog.url}
          target='_blank'
          rel='noopener noreferrer'
        >
          {blog.url}
        </a>
        <span className='font-semibold'>
          <button onClick={(e) => handleLike(e)}>
            <HandThumbUpIcon className='inline-block size-5' />
          </button>
          {blog.likes}
        </span>
      </div>

      <p>added by: {blog.user.name}</p>
      {blog.user.username === auth.username && (
        <button onClick={(e) => handleRemove(e)}>
          remove <TrashIcon className='inline-block size-5' />
        </button>
      )}

      <div>
        <h3 className='my-2 font-semibold'>comments</h3>
        {blog.comments.length > 0 ? (
          <ul className='mx-auto my-2 w-[80%] text-left'>
            {blog.comments.map((comment, index) => (
              <li
                className='m-1 box-border w-full border border-gray-100 p-2 first-of-type:rounded-t-lg last-of-type:rounded-b-lg hover:cursor-pointer hover:bg-red-100'
                key={index}
              >
                {comment}
              </li>
            ))}
          </ul>
        ) : (
          <p>no comment</p>
        )}
        <CommentForm handleAddComment={handleAddComment} />
      </div>
    </div>
  );
};

export default Blog;
