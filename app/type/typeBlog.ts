export interface Blog {
    title: string;
    description: string;
    imageUri: string|null;
    detail: string;
}

export interface BlogState{
    blogs: Blog[];
}

export interface BlogListItem{
    blogListItem: Blog;
}