import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class CommentGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly commetService: CommentService) {}

    @SubscribeMessage('addComment')
    async addComment(@MessageBody() createCommentDto: CreateCommentDto) {
        const commentData = {
            id: new Date().getTime(),
            ...createCommentDto,
        };

        const newComment = await this.commetService.create(commentData);
        this.server.emit('commentAdded', commentData);
        return newComment;
    }

    @SubscribeMessage('getComments')
    async getBookComments(@MessageBody() bookId: number) {
        const allComments = await this.commetService.findAll(bookId);
        this.server.emit('seeAllComments', allComments);
    }
}
