"use client";
import Profile from "@components/Profile";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfile = ({params}) => {
  const [userPosts, setUserPosts] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams()
  const userName = searchParams.get("name")

  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setUserPosts(data);
    };

    if (params?.id) fetchUserPosts();
  }, [params?.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = userPosts.filter((p) => p._id !== post._id);
        setUserPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(userPosts);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName} profile page`}
      data={userPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default UserProfile;
