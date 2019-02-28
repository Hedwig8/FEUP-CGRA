/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'viewTriangle').name('View Triangle');
        this.gui.add(this.scene, 'viewDiamond').name('View Diamond');
        this.gui.add(this.scene, 'viewParall').name('View Parall');
        this.gui.add(this.scene, 'viewSmallTri').name('View Small Tri');
        this.gui.add(this.scene, 'viewBigTri').name('View Big Tri');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}