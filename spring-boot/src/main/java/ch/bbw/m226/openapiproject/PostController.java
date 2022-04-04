package ch.bbw.m226.openapiproject;

import ch.bbw.m226.openapi.generated.controller.PostsApi;
import ch.bbw.m226.openapi.generated.dto.Comment;
import ch.bbw.m226.openapi.generated.dto.Post;
import ch.bbw.m226.openapi.generated.dto.VoteAction;
import ch.bbw.m226.openapi.generated.dto.Votes;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Validated
@RestController
public class PostController implements PostsApi {

    private final MessageBoardService service;

    public PostController(MessageBoardService service) {
        this.service = service;
    }

    // thank you java type system
    @SuppressWarnings({"rawtypes", "unchecked"})
    @Override
    public ResponseEntity changeVotesByPostId(Integer postId, VoteAction voteAction) {
        return this.service.changeVotesByPostId(postId, voteAction)
                .map(x -> ResponseEntity.ok().build())
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Override
    public ResponseEntity<Comment> createComment(Integer postId, Comment comment) {
        return this.service.createComment(postId, comment)
                .map(ResponseEntity.status(HttpStatus.CREATED)::body)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Override
    public ResponseEntity<Post> createPost(Post post) {
        return this.service.createPost(post)
                .map(ResponseEntity.status(HttpStatus.CREATED)::body)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Override
    public ResponseEntity<List<Comment>> getComments(Integer postId) {
        return this.service.getComments(postId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Override
    public ResponseEntity<Post> getPostById(Integer postId) {
        return this.service.getPostById(postId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Override
    public ResponseEntity<List<Post>> getPosts(Integer categoryId) {
        return this.service.getPosts(categoryId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Override
    public ResponseEntity<Votes> getVotesByPostId(Integer postId) {
        return this.service.getPostById(postId)
                .map(post -> ResponseEntity.ok(new Votes()
                        .upvote(post.getLikes())
                        .downvote(post.getDislikes()))
                )
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
