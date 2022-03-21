package ch.bbw.m226.openapiproject;

import ch.bbw.m226.openapi.generated.dto.Category;
import ch.bbw.m226.openapi.generated.dto.Comment;
import ch.bbw.m226.openapi.generated.dto.Post;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MessageBoardService {

    private Map<Integer, Category> categories;
    private Map<Integer, List<Post>> posts;
    private Map<Integer, List<Comment>> comments;

    public MessageBoardService() {
        this.categories = new HashMap<>();
        this.posts = new HashMap<>();
        this.comments = new HashMap<>();

        this.categories.put(1, new Category()
                .id(1)
                .description("Pictures of Rick Astley")
                .name("Rick Astley Pics"));

        this.posts.put(0, List.of(new Post().id(1)
                .author("hugo")
                .category(0)
                .content("guten morgen")
                .title("begrüssung")
                .createdDate(LocalDate.of(2020, 5, 1))
        ));
    }

    public List<Category> getCategories() {
        return this.categories.values().stream().toList();
    }

    public List<Comment> getComments(Integer postId) {
        return null;
    }

    public Comment createComment(Integer postId, Comment comment) {
        return null;
    }
}
