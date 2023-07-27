import React, { useState } from "react";
import Comment from "../Comment/Comment";
import styles from "./CommentSection.module.css";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleClick = () => {
    setComments((prev) => {
      return [...prev, comment];
    });

    setComment("");
  };

  return (
    <>
      <div className={styles.commentSection}>
        <h2 className={styles.heading}>Comment Section</h2>
        <input
          value={comment}
          onChange={handleChange}
          className={styles.textArea}
          placeholder="Enter your comment"
          required
        />
        <button className={styles.addButton} onClick={handleClick}>
          Add Comment
        </button>
        {comments.map((e, i) => {
          return <Comment key={i} content={e} />;
        })}
      </div>
    </>
  );
};

export default CommentSection;
