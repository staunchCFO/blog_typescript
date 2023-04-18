import PostModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.interface';

class PostService {
    private post = PostModel;

    /**
     * Create a new post
     */

    public async create(title: string, body: string): Promise<Post> {
        try {
            const post = await this.post.create({ title, body})
            return post
        } catch (error) {
            throw new Error('Unable to create post')
        }
    }

    /**
     * Find all posts
     */

    public async find(): Promise<Post[]> {
        try {
            const post = await this.post.find()
            return post
        } catch (error) {
            throw new Error('No posts available')
        }
    }
}

export default PostService;