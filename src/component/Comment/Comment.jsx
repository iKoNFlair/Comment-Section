import React, { useState } from "react";
import styles from "./Comment.module.css";

const Comment = ({ content }) => {
  const [score, setScore] = useState(0);
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([]);
  const [showReply, setShowReply] = useState(false);

  const handleChange = (e) => {
    setReply(e.target.value);
  };

  const handleClick = () => {
    if (!showReply) setShowReply(!showReply);
    setReplies((prev) => {
      return [...prev, reply];
    });

    setReply("");
  };

  const handleScore = (val) => {
    if (val === 1) setScore(score + 1);
    else setScore(score - 1);
  };

  return (
    <>
      <div className={styles.commentContainer}>
        <p className={styles.content}>{content}</p>
        <div className={styles.interactionContainer}>
          <button className={styles.likeButton} onClick={() => handleScore(1)}>
            Like
          </button>
          <button
            className={styles.dislikeButton}
            onClick={() => handleScore(2)}
          >
            Dislike
          </button>
          <span className={styles.score}>Score: {score}</span>
        </div>
        <div className={styles.replyContainer}>
          <input
            type="text"
            value={reply}
            onChange={handleChange}
            placeholder="Reply..."
            className={styles.replyInput}
            required
          />
          <button className={styles.addReplyButton} onClick={handleClick}>
            Add Reply
          </button>
        </div>
        {showReply && (
          <div className={styles.repliesContainer}>
            {replies.map((e, i) => {
              return (
                <>
                  <div key={i} className={styles.replyItem}>
                    <span className={styles.replyText}>{e} </span>
                    <span className={styles.replyCount}>--- {i++}</span>
                  </div>

                  <Comment />
                </>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Comment;
