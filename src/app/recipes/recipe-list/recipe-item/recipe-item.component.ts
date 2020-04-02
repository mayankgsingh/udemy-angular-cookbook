import { Component, OnInit, Input, EventEmitter, Output, ElementRef, Renderer2 } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() idx: number;

  constructor(private eleRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSelected() {
    this.router.navigate([this.idx], {relativeTo: this.route});
    //this.renderer.addClass(this.eleRef, "active");
  }
}
