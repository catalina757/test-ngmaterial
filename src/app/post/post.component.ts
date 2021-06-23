import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

export interface Post {
  id?: number;
  title: string;
  category: string;
  date_posted: Date;
  position: number;
  body: string;
}