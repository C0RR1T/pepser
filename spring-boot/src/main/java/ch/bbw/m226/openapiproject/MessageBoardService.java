package ch.bbw.m226.openapiproject;

import ch.bbw.m226.openapi.generated.dto.Category;
import ch.bbw.m226.openapi.generated.dto.Comment;
import ch.bbw.m226.openapi.generated.dto.Post;
import ch.bbw.m226.openapi.generated.dto.VoteAction;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class MessageBoardService {

    private final Map<Integer, Category> categories = new ConcurrentHashMap<>();
    private final Map<Integer, List<Post>> posts = new ConcurrentHashMap<>();
    private final Map<Integer, List<Comment>> comments = new ConcurrentHashMap<>();

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
                .title("hallo")
                .likes(6)
                .dislikes(1)
                .createdDate(LocalDate.of(2020, 5, 1))
        ));

        this.comments.put(1, new ArrayList<>());
    }

    public List<Category> getCategories() {
        return this.categories.values().stream().toList();
    }

    public synchronized Optional<Integer> changeVotesByPostId(Integer postId, VoteAction voteAction) {
        return this.getPostById(postId).map(post -> {
            switch (voteAction.getVote()) {
                case UPVOTE -> post.setLikes(post.getLikes() + 1);
                case DOWNVOTE -> post.setDislikes(post.getDislikes() + 1);
                case UNDO_UPVOTE -> post.setLikes(Math.max(post.getLikes() - 1, 0));
                case UNDO_DOWNVOTE -> post.setDislikes(Math.max(post.getDislikes() - 1, 0));
            }
            // map returns Optional.ofNullable() so null doesn't work with Optional<Void>
            return 0;
        });
    }

    public Category createCategory(Category category) {
        final var newId = this.randomId();

        category.id(newId);

        this.categories.put(newId, category);
        this.posts.put(newId, new ArrayList<>());

        return category;
    }

    public Optional<Category> getCategoryById(Integer id) {
        return Optional.ofNullable(this.categories.get(id));
    }

    public Optional<Post> getPostById(Integer postId) {
        return this.posts.values().stream()
                .flatMap(Collection::stream)
                .filter(post -> post.getId().equals(postId))
                .findAny();
    }

    public Optional<List<Post>> getPosts(Integer categoryId) {

        return Optional.ofNullable(this.posts.get(categoryId))
                .map(posts -> {
                    posts.sort(Comparator.comparing(post -> post.getDislikes() - post.getLikes())); // reversed
                    return posts;
                });
    }

    public Optional<Post> createPost(Post post) {
        final var newId = this.randomId();
        final var createdDate = LocalDate.now();

        post.id(newId)
                .createdDate(createdDate)
                .likes(0)
                .dislikes(0);

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
        final var commentId = this.randomId();
        final var createdDate = LocalDate.now();

        comment.id(commentId)
                .createdDate(createdDate)
                .likes(0)
                .dislikes(0);

        return Optional.ofNullable(this.comments.get(postId)).map(comments -> {
            comments.add(comment);
            return comment;
        });
    }

    private Integer randomId() {
        final var id = this.random.nextInt();
        return Math.abs(id);
    }
}
