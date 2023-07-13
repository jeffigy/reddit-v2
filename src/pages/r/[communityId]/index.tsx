import { Community } from "@/atoms/communitiesAtom";
// import Header from "@/src/components/Community/Header";
import NotFound from "@/components/Community/NotFound";
import PageContent from "@/components/Layout/PageContent";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";
import safeJsonStringify from "safe-json-stringify";
import Header from "@/components/Community/Header";
import CreatePostLink from "@/components/Community/CreatePostLink";
import Posts from "@/components/Posts/Posts";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  console.log("current data", communityData);
  if (!communityData) return <NotFound />;
  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <div>right side</div>
        </>
      </PageContent>
    </>
  );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // get community data
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : "",
      },
    };
  } catch (error) {
    //could add error page here
    console.log("getServerSideProps error", error);
  }
}
export default CommunityPage;
