import { TestBed, inject } from '@angular/core/testing';

import { PostService } from './post.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Posts } from '../class/posts';

describe('PostService', () => {
  let service: PostService;
  let testingController : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(PostService);
    testingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() =>{
    testingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get Posts testCase', () =>{
    let mockPost: Posts[] = [];

    service.getAllPosts().subscribe((result) =>{
      expect(result).toEqual(mockPost);
    });

      const req = testingController.expectOne('https://projectdemo-9f2d5-default-rtdb.firebaseio.com/posts.json');
      console.log(req);
      expect(req.request.method).toBe('GET');
      expect(req.request.responseType).toEqual('json');
      req.flush(mockPost);
    
  });

  it('should create a new post', () =>{
      const mockPost:Posts = {
        userId: '',
        path: '',
        description: '',
        likes: 0,
        comments: '',
        comment_count: 0,
        interactions: 0,
        timestamp: 0,
        postId: '',
        username: ''
      };

      service.newPost(mockPost).subscribe((response) => {
        expect(response).toBeDefined();
      });

      const req = testingController.expectOne('https://projectdemo-9f2d5-default-rtdb.firebaseio.com/posts.json');
      expect(req.request.method).toEqual('POST');
      req.flush({});
    });

    it('should update post with new likes', () =>{
      const mockPost:Posts = {
        userId: '',
        path: '',
        description: '',
        likes: 0,
        comments: '',
        comment_count: 0,
        interactions: 0,
        timestamp: 0,
        postId: 'abc',
        username: ''
      };
      const updatedLikes=10;

      service.updatePost("abc",{...mockPost,likes:updatedLikes}).subscribe((response) => {
        console.log('response receieved: ')
        console.log(response)
        expect(response).toBeDefined();
      });

      const req = testingController.expectOne(`https://projectdemo-9f2d5-default-rtdb.firebaseio.com/posts/${mockPost.postId}.json`);      
      expect(req.request.method).toBe('PUT');
      req.flush({});

    })
});
