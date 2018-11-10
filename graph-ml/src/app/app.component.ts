import {Component, ViewChildren, OnInit} from '@angular/core';
import {BoxComponent} from './box/box.component'
import {BoxWrapper} from "./box-wrapper";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChildren(BoxComponent) children;
    
    boxSet =  new Set<BoxWrapper>();

    title = 'app';

    draggedBox = null;

    panning = false;
    panStartX = 0;
    panStartY = 0;
    public panX=0;
    public panY=0;
    public panDx=0;
    public panDy=0;
    public zoom = 1;
    zoomRate = 1.1;
    zoomMax = 3;
    zoomMin = 0.1;


    ngOnInit() {
        console.log(this.children);
        this.boxSet.add(new BoxWrapper());
        this.boxSet.add(new BoxWrapper(20, 300));
        this.boxSet.add(new BoxWrapper(500,200));
    }

    mouseDown($event) {
        this.panStartX = $event.clientX;
        this.panStartY = $event.clientY;
        this.panning = true;
    }

    mouseMove($event) {
        if(this.panning) {
            this.panDx = $event.clientX - this.panStartX;
            this.panDy = $event.clientY - this.panStartY;
        }
        if(this.draggedBox) this.draggedBox.mouseMove($event);

    }
    
    mouseUp($event) {
        if (this.panning) {
            this.panX += this.panDx;
            this.panY += this.panDy;
            this.panDx=0;
            this.panDy=0;
            this.panning = false;
        } else if(this.draggedBox) this.draggedBox.mouseUp($event);
    }

    onScroll($event){
        var scroll = -$event.deltaY/100;
        var lastZoom = this.zoom;
        var zoomed = this.zoom*Math.pow(this.zoomRate, scroll);
        if(zoomed>this.zoomMin && zoomed < this.zoomMax) this.zoom = zoomed;
        var pivotX = $event.clientX -this.panX;
        this.panX += (lastZoom - this.zoom) * pivotX / lastZoom;
        var pivotY = $event.clientY - this.panY;
        this.panY += (lastZoom - this.zoom) * pivotY / lastZoom;
    }

    registerBox(box){
        if(this.draggedBox) this.draggedBox.notOnTop();
        this.draggedBox=box;
        box.makeOnTop();
    }

    onTap($event){
        //TODO: Use as example to add boxes:
        this.boxSet.add(new BoxWrapper($event.getCoordinates()[0]+100,$event.getCoordinates()[1]+50));
    }
}
