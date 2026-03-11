import { AllPosts } from "@/components/feed/allPosts.js";
import { WritePost } from "@/components/feed/WritePost.js";
import { useAuth } from "@/context/useAuth.js";
import { useState } from "react";
import { FilterHeader } from "@/components/feed/filterFeedHeader.js";

export function MainFeed() {
  const { user, token } = useAuth();
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["positivo", "neutral", "negativo"]);
  const [appliedFilters, setAppliedFilters] = useState<string[]>(["positivo", "neutral", "negativo"]);

  const handleFilterChange = (sentiment: string) => {
    setSelectedFilters((prev) =>
      prev.includes(sentiment)
        ? prev.filter((s) => s !== sentiment)
        : [...prev, sentiment]
    );
  };

  const handleApplyFilters = () => {
    setAppliedFilters(selectedFilters);
  };

  return (
    <>
      {user && token && <WritePost user={user} token={token} isReply={false}/>}
      <FilterHeader appliedFilters={appliedFilters} selectedFilters={selectedFilters} handleApplyFilters={handleApplyFilters} handleFilterChange={handleFilterChange} />
      <AllPosts filters={appliedFilters}/>
    </>
  )
}

