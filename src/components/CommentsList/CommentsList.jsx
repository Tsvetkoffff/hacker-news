import React, { useEffect, useState, useRef } from 'react';
import { useFetching } from '../../hooks/useFetching';
import { getComments } from '../../api/services';
import styles from './CommentsList.module.css';
import { mapDateFromStamp } from '../../utils/utils';
import { Comment, Tooltip, Avatar } from 'antd';
import MySpin from '../MySpin/MySpin';

const CommentsList = ({ commentsArr }) => {
  const [comments, setComments] = useState([]);
  const mountedRef = useRef(true);
  const [fetchComments, commentsIsLoading, commentsError] = useFetching(
    async () => {
      const comments = await getComments(commentsArr);
      if (!mountedRef.current) return null;
      setComments(comments);
    }
  );

  useEffect(() => {
    fetchComments();
    return () => {
      mountedRef.current = false
    }
  }, [commentsArr]);

  return commentsIsLoading ? <MySpin/> : comments.map((comment) => (
    <Comment
      author={<a>{comment.by}</a>}
      avatar={
        <Avatar src='https://joeschmoe.io/api/v1/random' alt={comment.by} />
      }
      content={<p>{comment.text}</p>}
      datetime={
        <Tooltip title={mapDateFromStamp(comment.time)}>
          <span>{mapDateFromStamp(comment.time)}</span>
        </Tooltip>
      }
      className={styles.comment}
      key={comment.id}
      onClick={() => console.log(comments)}
    />
  ));
};

export default CommentsList;
