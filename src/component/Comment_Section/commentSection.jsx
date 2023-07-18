import React, { useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import "./commentSection.css";

const Reply = ({ reply }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  return (
    <div className="reply">
      <p>{reply.text}</p>
      <div className="likes">
        <div>{likes}</div>
        <AiFillLike color="blue" onClick={handleLike} />
      </div>
      <div className="dislikes">
        <div>{dislikes}</div>
        <AiFillDislike color="red" onClick={handleDislike} />
      </div>
    </div>
  );
};

const Comment = ({ comment }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState([]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
    setReplyText("");
  };

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = (event) => {
    event.preventDefault();
    if (replyText.trim() !== "") {
      const newReply = {
        text: replyText,
        replies: [],
      };
      setReplies([...replies, newReply]);
      setReplyText("");
      setShowReplyForm(false);
    }
  };

  return (
    <div className="comment">
      <p>{comment.text}</p>
      <div className="likes">
        <div>{likes}</div>
        <AiFillLike color="blue" onClick={handleLike} />
      </div>
      <div className="dislikes">
        <div>{dislikes}</div>
        <AiFillDislike color="red" onClick={handleDislike} />
      </div>
      <button onClick={toggleReplyForm}>Reply</button>
      {showReplyForm && (
        <form onSubmit={handleReplySubmit}>
          <div>
            <textarea
              value={replyText}
              placeholder="Enter your reply.."
              onChange={handleReplyChange}
            />
          </div>
          <button type="submit">Add Reply</button>
        </form>
      )}
      <div className="replies">
        {replies.map((reply) => (
          <Reply key={reply.id} reply={reply} />
        ))}
      </div>
    </div>
  );
};

const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

const CommentForm = ({ onCommentSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      onCommentSubmit({ text, replies: [] });
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <textarea
          value={text}
          placeholder="Enter your comment.."
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button type="submit">Add Comment</button>
    </form>
  );
};

const CommentSection = () => {
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = (newComment) => {
    setComments([...comments, { ...newComment }]);
  };

  return (
    <div>
      <h1>Comments</h1>
      <CommentList comments={comments} />
      <CommentForm onCommentSubmit={handleCommentSubmit} />
    </div>
  );
};

export default CommentSection;
