import React,  { useRef, useState }  from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createPost } from "../store/actions/postAction";
import ImageIcon from '@mui/icons-material/Image';
import GifBoxIcon from '@mui/icons-material/GifBox';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
// import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

// function TweetBox() {
//   const [tweet, setTweet] = useState("");

//   return (
//     <div className="flex space-x-3 border-b border-gray-700 p-4">
//       {/* Avatar */}
//       <img
//         src="https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg"
//         alt="avatar"
//         className="w-12 h-12 rounded-full"
//       />

//       {/* Tweet input and icons */}
//       <div className="flex-1">
//         {/* Input */}
//         <textarea
//           value={tweet}
//           onChange={(e) => setTweet(e.target.value)}
//           placeholder="What’s happening?"
//           className="w-full bg-transparent resize-none text-lg placeholder-gray-500 focus:outline-none text-white"
//           rows="2"
//         />

//         {/* Icons and Post button */}
//         <div className="flex items-center justify-between mt-2 border-t border-gray-800 pt-2">
//           {/* Icons */}
//           <div className="flex space-x-4 text-[#1D9BF0]">
//             <ImageIcon className="cursor-pointer w-5 h-5 hover:text-[#1A8CD8]" />
//             <GifBoxIcon className="cursor-pointer w-5 h-5 hover:text-[#1A8CD8]" />
//             <SentimentSatisfiedAltIcon className="cursor-pointer w-5 h-5 hover:text-[#1A8CD8]" />
//             {/* <Calendar className="cursor-pointer w-5 h-5 hover:text-[#1A8CD8]" /> */}
//             {/* <AddLocationAltIcon className="cursor-pointer w-5 h-5 hover:text-[#1A8CD8]" /> */}
//           </div>

//           {/* Post Button */}
//           <button
//             disabled={!tweet.trim()}
//             className={`rounded-full px-4 py-1.5 font-bold transition-colors ${
//               tweet.trim()
//                 ? "bg-[#1D9BF0] text-white hover:bg-[#1A8CD8]"
//                 : "bg-gray-600 text-gray-300 cursor-not-allowed"
//             }`}
//           >
//             Post
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TweetBox;


function TweetBox() {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const imageFile = watch("image");
  const tweetText = watch("content");

  const handleImageClick = () => fileRef.current.click();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("content", data.content);
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    dispatch(createPost(formData));
    reset();
    setPreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("image", e.target.files);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex space-x-3 border-b border-gray-700 p-4"
    >
      {/* Avatar */}
      <img
        src="https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg"
        alt="avatar"
        className="w-12 h-12 rounded-full"
      />

      {/* Input Area */}
      <div className="flex-1">
        <textarea
          {...register("content")}
          placeholder="What’s happening?"
          className="w-full bg-transparent resize-none text-lg placeholder-gray-500 focus:outline-none text-white"
          rows="2"
        />

        {preview && (
          <div className="mt-2 relative">
            <img
              src={preview}
              alt="preview"
              className="rounded-xl max-h-64 object-cover"
            />
            <button
              type="button"
              onClick={() => {
                setPreview(null);
                setValue("image", null);
              }}
              className="absolute top-1 right-2 bg-black bg-opacity-60 text-white rounded-full px-2"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex items-center justify-between mt-2 border-t border-gray-800 pt-2">
          <div className="flex space-x-4 text-[#1D9BF0]">
            <ImageIcon
              className="cursor-pointer w-5 h-5 hover:text-[#1A8CD8]"
              onClick={handleImageClick}
            />
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              ref={fileRef}
              onChange={handleImageChange}
              className="hidden"
            />
            <GifBoxIcon className="cursor-pointer w-5 h-5 hover:text-[#1A8CD8]" />
            <SentimentSatisfiedAltIcon className="cursor-pointer w-5 h-5 hover:text-[#1A8CD8]" />
          </div>

          <button
            type="submit"
            disabled={!tweetText && !preview}
            className={`rounded-full px-4 py-1.5 font-bold transition-colors ${
              tweetText || preview
                ? "bg-[#1D9BF0] text-white hover:bg-[#1A8CD8]"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }`}
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}

export default TweetBox;
