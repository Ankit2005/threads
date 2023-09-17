import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user: any = await currentUser();
  console.log("userINfo", user);
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  console.log("userINfo", userInfo);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  console.log("=======================================");
  console.log("thread --->", thread);

  return (
    <section className="mt-9 flex flex-col gap-10">
      <ThreadCard
        key={thread._id}
        id={thread._id}
        currentUserId={user.id}
        parentId={thread.parentId}
        content={thread.text}
        author={thread.author}
        community={thread.community}
        createdAt={thread.createdAt}
        comments={thread.children}
      />

      <div className="mt-7">
        <Comment
          threadId={thread?.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>
      <div className="mt-10">
        {thread.children.map((childItem: any) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
          />
        ))}
      </div>
    </section>
  );
};

export default Page;
