import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
    @Input('cx')cx;
    @Input('cy')cy;
    @Input('slate') slate :any;

    @Output() onDrag = new EventEmitter<BoxComponent>();
    @Output() onTap = new EventEmitter<BoxComponent>();


    public onTop = false;

    clickThreshold = 1;

    private dragging:boolean = false;
    private clickX:number = 0;
    private clickY:number = 0;
    public posX:number = 0;
    public posY:number = 0;

    public dx:number = 0;
    public dy:number = 0;

    constructor() {
    }

    ngOnInit() {
        if (this.cx) this.posX = parseInt(this.cx,10);
        if (this.cy) this.posY = parseInt(this.cy, 10);
    }

    mouseDown($event) {
        console.log("down");
        console.log($event);
        this.dragging = true;
        this.clickX = $event.clientX;
        this.clickY = $event.clientY;
        this.onDrag.emit(this);
        $event.stopPropagation();
    }

    mouseMove($event) {
        if (this.dragging) {
            this.dx = $event.clientX - this.clickX;
            this.dy = $event.clientY - this.clickY;
            console.log(this.slate.zoom);
            console.log([this.posX*this.slate.zoom+this.dx,this.posY*this.slate.zoom+this.dy])
        }
    }

    public mouseUp($event) {
        if(this.dragging && this.dx*this.dx+this.dy*this.dy<this.clickThreshold){
            this.onClick($event);
        }
        else if (this.dragging) {
            this.posX += this.dx/this.slate.zoom;
            this.posY += this.dy/this.slate.zoom;
        }
        this.dx = 0;
        this.dy = 0;
        this.dragging = false;
    }

    public onClick($event){
        this.onTap.emit(this);
    }

    public notOnTop(){
        this.onTop = false;
    }
    
    public makeOnTop(){
        this.onTop = true;
    }

    public getCoordinates(){
        return [this.posX, this.posY];
    }
}
