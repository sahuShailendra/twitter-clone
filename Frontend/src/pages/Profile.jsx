import React, { useEffect } from "react";
import Post from "../Components/Post";
import ProfileCom from "../Components/ProfileCom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOtherProfile } from "../store/actions/userAction.jsx";
import { fetchUserPosts } from "../store/actions/postAction.jsx";

function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.user.user);
  const otherProfile = useSelector((state) => state.user.otherProfile);
  const loading = useSelector((state) => state.user.loading);
  const userPost = useSelector((state) => state.posts.userPosts);

  const isCurrentUser = loggedUser?._id === id;
  const profileData = isCurrentUser ? loggedUser : otherProfile;

  useEffect(() => {
    if (!isCurrentUser) {
      dispatch(fetchOtherProfile(id));
    } else {
      dispatch(fetchUserPosts(loggedUser._id));
    }
  }, [id, isCurrentUser]);

  if (loading || (!isCurrentUser && !otherProfile)) {
    return <h3 className="text-white text-center mt-5">Loading Profile...</h3>;
  }

  return (
    <div className="flex flex-col no-scrollbar">
      {/* header */}
      <ProfileCom
        profile={{
          _id: profileData._id,
          name: profileData.name,
          username: profileData.username,
          bio: profileData.bio,
          avatar: profileData.avatar,
          banner: profileData.banner,
          followers: profileData.followers || 0,
          following: profileData.following || 0,
          isFollowing: !isCurrentUser ? profileData.isFollowing : undefined,
        }}
        isCurrentUser={isCurrentUser}
      />

      {/* Posts */}
      {isCurrentUser
        ? userPost?.map((post, index) => (
            <Post
              key={post._id || index}
              user={post.user}
              text={post.content}
              image={post.image?.url}
            />
          ))
        : otherProfile?.userPosts.map((post, index) => (
            <Post
              key={post._id || index}
              user={{
                _id: otherProfile._id,
                name: otherProfile.name,
                username: otherProfile.username,
                avatar: otherProfile.avatar,
              }}
              text={post.content}
              image={post.image?.url}
            />
          ))}
    </div>
  );
}

export default Profile;
