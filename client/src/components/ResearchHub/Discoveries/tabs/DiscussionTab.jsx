import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/axios";
import {
  Heart,
  MessageCircle,
  Send,
  UserCircle2,
} from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import toast from "react-hot-toast";


export default function DiscussionTab({ discovery }) {
const { user } = useAuth();
const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (discovery?._id) {
      fetchComments();
    }
  }, [discovery?._id]);

  async function fetchComments() {
  try {
    const { data } = await api.get(
      `/discoveries/${discovery._id}/comments`
    );

    setComments(data.comments);
  } catch (err) {
    console.error(err);
    toast.error("Failed to load comments.");
  } finally {
    setLoading(false);
  }
}

  async function handleComment() {
if (!user) {
  toast.error("Please login to join the discussion.");
  setTimeout(() => navigate("/login"), 800);
  return;
}
if (!message.trim()) return;

    try {
     await api.post(
  `/discoveries/${discovery._id}/comments`,
  {
    author: user.username,
    message,
  }
);

setMessage("");

await fetchComments();

toast.success("Comment posted successfully!");
    } catch (err) {
  console.error(err);
  toast.error("Failed to post comment.");
}
  }

  return (
    <motion.div
      key="discussion"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-8"
    >
      {/* Header */}

      <div>
        <h2 className="flex items-center gap-3 text-2xl font-bold text-[#f5e4c4]">
          <MessageCircle className="text-[#ddb878]" />
          Research Discussion
        </h2>

        <p className="mt-2 text-[#bca88b]">
          Scientists and museum researchers collaborate here.
        </p>
      </div>

      {/* Add Comment */}

      <div className="rounded-3xl border border-[#8b6a3d]/20 bg-[#1b140f] p-6">
       <textarea
  rows={4}
  value={message}
  disabled={!user}
  onChange={(e) => setMessage(e.target.value)}
  placeholder={
    user
      ? "Share your observations..."
      : "Login to join the discussion..."
  }
  className="
    w-full
    resize-none
    rounded-2xl
    border
    border-[#8b6a3d]/20
    bg-[#140f0b]
    p-4
    text-[#f5e4c4]
    placeholder:text-[#8f7b5d]
    disabled:opacity-60
    disabled:cursor-not-allowed
    focus:border-[#ddb878]
    focus:outline-none
  "
/>

        <div className="mt-4 flex justify-end">
       <button
  onClick={handleComment}
  disabled={!user}
  className="
    flex
    items-center
    gap-2
    rounded-xl
    bg-[#ddb878]
    px-5
    py-3
    font-semibold
    text-[#24170f]
    transition
    disabled:cursor-not-allowed
    disabled:opacity-60
    hover:scale-105
  "
>
            <Send size={18} />
            {user ? "Post Comment" : "Login to Comment"}
          </button>
        </div>
      </div>

      {/* Loading */}

      {loading && (
        <p className="text-center text-[#bca88b]">
          Loading comments...
        </p>
      )}

      {/* Empty State */}

      {!loading && comments.length === 0 && (
        <div className="rounded-3xl border border-dashed border-[#8b6a3d]/20 bg-[#1b140f] p-10 text-center">
          <p className="text-[#bca88b]">
            No comments yet. Be the first researcher to contribute.
          </p>
        </div>
      )}

      {/* Comments */}

      <div className="space-y-5">
        {comments.map((comment, index) => (
          <motion.div
            key={comment._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.08,
            }}
            className="
              rounded-3xl
              border
              border-[#8b6a3d]/20
              bg-[#1b140f]
              p-6
            "
          >
            <div className="flex gap-4">
              <UserCircle2
                size={48}
                className="text-[#ddb878]"
              />

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-[#f5e4c4]">
                      {comment.author}
                    </h3>

                    <p className="text-sm text-[#9d8a70]">
                     {comment.author === user?.username
  ? "You"
  : "Community Researcher"}
                    </p>
                  </div>

                  <span className="text-xs text-[#8f7b5d]">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>

                <p className="mt-4 leading-7 text-[#ccb998]">
                  {comment.message}
                </p>

               <div className="mt-5">
  <span className="text-sm text-[#8f7b5d] italic">
    Community Discussion
  </span>
</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}