export class BoxWrapper {
    public cx=0;
    public cy=0;
    
    constructor(cx:number=0, cy:number=0){
        if(cx) this.cx = cx;
        if(cy) this.cy = cy;
    }
}
