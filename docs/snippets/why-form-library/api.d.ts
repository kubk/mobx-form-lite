export type Article = {
  title: string;
  description: string;
  tags: string[];
};

export declare const api: {
  saveArticle(article: Article): Promise<void>;
};
