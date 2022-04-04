package ch.bbw.m226.openapiproject;

import ch.bbw.m226.openapi.generated.dto.Category;
import ch.bbw.m226.openapi.generated.dto.Comment;
import ch.bbw.m226.openapi.generated.dto.Post;
import ch.bbw.m226.openapi.generated.dto.VoteAction;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class MessageBoardService {

    private final Map<Integer, Category> categories = new HashMap<>();
    private final Map<Integer, List<Post>> posts = new HashMap<>();
    private final Map<Integer, List<Comment>> comments = new HashMap<>();

    private final Random random = new Random();

    public MessageBoardService() {
        this.categories.put(0, new Category()
                .id(0)
                .description("Pictures of Rick Astley")
                .name("Rick Astley Pics"));

        this.posts.put(0, List.of(new Post().id(1)
                .author("hugo")
                .category(0)
                .content("guten morgen")
                .title("begrüssung")
                .likes(6)
                .dislikes(1)
                .createdDate(LocalDate.of(2020, 5, 1))
        ));

        this.comments.put(1, new ArrayList<>());
    }

    public List<Category> getCategories() {
        return this.categories.values().stream().toList();
    }

    public Optional<Void> changeVotesByPostId(Integer postId, VoteAction voteAction) {
        return this.posts.values().stream()
                .flatMap(Collection::stream)
                .filter(post -> post.getId().equals(postId))
                .findAny()
                .map(post -> {
                    switch (voteAction.getVote()) {
                        case UPVOTE -> post.setLikes(post.getLikes() + 1);
                        case DOWNVOTE -> post.setDislikes(post.getDislikes() + 1);
                        case DISABLE_UPVOTE -> post.setLikes(Math.max(post.getLikes() - 1, 0));
                        case DISABLE_DOWNVOTE -> post.setLikes(Math.max(post.getDislikes() -1, 0));
                    }
                    return null;
                });
    }

    public Category createCategory(Category category) {
        final var newId = random.nextInt();

        category.id(newId);

        this.categories.put(newId, category);
        this.posts.put(newId, new ArrayList<>());

        return category;
    }

    public Optional<Category> getCategoryById(Integer id) {
        return this.categories.values().stream().filter(val -> val.getId().equals(id)).findFirst();
    }

    public Optional<Post> getPostById(Integer postId) {
        return this.posts.values().stream()
                .flatMap(Collection::stream)
                .filter(post -> post.getId().equals(postId))
                .findAny();
    }

    public Optional<List<Post>> getPosts(Integer categoryId) {
        return Optional.of(this.posts.get(categoryId));
    }

    public Optional<Post> createPost(Post post) {
        final var newId = random.nextInt();
        final var createdDate = LocalDate.now();

        post.id(newId).createdDate(createdDate);

        return Optional.ofNullable(this.posts.get(post.getCategory())).map(posts -> {
            posts.add(post);
            this.comments.put(newId, new ArrayList<>());
            return post;
        });
    }

    public Optional<List<Comment>> getComments(Integer postId) {
        return Optional.ofNullable(this.comments.get(postId));
    }

    public Optional<Comment> createComment(Integer postId, Comment comment) {
        final var commentId = this.random.nextInt();
        final var createdDate = LocalDate.now();

        comment.id(commentId).createdDate(createdDate);

        return Optional.ofNullable(this.comments.get(postId)).map(comments -> {
            comments.add(comment);
            return comment;
        });
    }
}
