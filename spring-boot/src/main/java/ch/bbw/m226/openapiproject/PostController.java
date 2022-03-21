package ch.bbw.m226.openapiproject;

import ch.bbw.m226.openapi.generated.controller.PostsApi;
import ch.bbw.m226.openapi.generated.dto.Category;
import ch.bbw.m226.openapi.generated.dto.Comment;
import ch.bbw.m226.openapi.generated.dto.Post;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.*;

@Validated
@RestController
public class PostController implements PostsApi {

    private final Map<Integer, Category> categories = new HashMap<>();
    private final Map<Integer, List<Post>> categoryPosts = new HashMap<>();
    private final Map<Integer, Post> posts = new HashMap<>();
    private final Map<Integer, Map<Integer, Comment>> comments = new HashMap<>();
    private final Random random = new Random();

    private MessageBoardService service;

    public PostController(MessageBoardService service) {
        this.service = service;

        this.categories.put(1, new Category()
                .id(1)
                .description("Pictures of Rick Astley")
                .name("Rick Astley Pics"));
        this.posts.put(1, new Post().id(1)
                .author("hugo")
                .category(1)
                .content("guten morgen")
                .title("begrüssung")
                .createdDate(LocalDate.of(2020, 5, 1))
        );
        this.categoryPosts.put(1, List.of(this.posts.get(1)));
    }

    @Override
    public ResponseEntity<Comment> createComment(Integer postId, Comment comment) {
        final var postComments = this.comments.get(postId);

        if (postComments == null) {
            return ResponseEntity.notFound().build();
        }

        final var commentId = this.random.nextInt();
        final var createdDate = LocalDate.now();

        comment.id(commentId).createdDate(createdDate);

        postComments.put(commentId, comment);

        return ResponseEntity.status(HttpStatus.CREATED).body(comment);
    }

    @Override
    public ResponseEntity<Post> createPost(Post post) {
        final var newId = random.nextInt();
        final var createdDate = LocalDate.now();

        post.id(newId).createdDate(createdDate);

        this.categoryPosts.putIfAbsent(post.getCategory(), new ArrayList<>());
        this.categoryPosts.get(post.getCategory()).add(post);

        this.posts.put(newId, post);
        this.comments.put(newId, new HashMap<>());

        return ResponseEntity.status(HttpStatus.CREATED).body(post);
    }

    @Override
    public ResponseEntity<List<Comment>> getComments(Integer postId) {
        return this.service.getComments(postId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Override
    public ResponseEntity<List<Post>> getPostById(Integer postId) {
        return null;
    }

    @Override
    public ResponseEntity<List<Post>> getPosts(Integer categoryId) {
        return Optional.ofNullable(this.categoryPosts.get(categoryId))
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
