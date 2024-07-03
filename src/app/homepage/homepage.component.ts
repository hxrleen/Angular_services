import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  src: string =
    'https://media.istockphoto.com/id/1322155528/video/adorable-white-cat-in-sunglasses-and-an-shirt-lies-on-a-fabric-hammock-on-a-yellow-background.mp4?s=mp4-640x640-is&k=20&c=oP_HB19sGng_P5OPAdn2iwFwtNlqW9xLPT-04GVV9uE=';

  constructor() {}

  ngOnInit(): void {}
}
