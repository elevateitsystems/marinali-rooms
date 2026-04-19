import { useQuery } from "@tanstack/react-query";

export interface PageContent {
  _id: string;
  page: string;
  lang: string;
  sections: any;
}

const fetchContent = async (lang: string, page: string): Promise<PageContent> => {
  const response = await fetch(`/api/content/${lang}/${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch content");
  }
  return response.json();
};

export const useContent = (lang: string, page: string) => {
  return useQuery({
    queryKey: ["content", lang, page],
    queryFn: () => fetchContent(lang, page),
    enabled: !!lang && !!page, // Only fetch if both lang and page are provided
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};
